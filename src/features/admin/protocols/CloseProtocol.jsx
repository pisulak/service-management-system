import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";
import { Add, Delete } from "../../../components/icons/ProtocolIcons.jsx";

export default function CloseProtocol() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [partsList, setPartsList] = useState([]);
  const [workSessions, setWorkSessions] = useState([]);
  const [usedParts, setUsedParts] = useState([]);
  const [parentData, setParentData] = useState(null);

  function handleBackButton() {
    navigate(`/protocol/${id}`);
  }

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/protocols/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania protokołu");
        const data = await res.json();
        setProtocol(data);

        if (data.closed_at !== null) {
          navigate(`/protocol/${id}`);
          return;
        }

        if (data.scheduled_at) {
          const schedDateObj = new Date(data.scheduled_at);
          const scheduledYear = schedDateObj.getFullYear();
          const scheduledMonth = schedDateObj.getMonth() + 1;
          const scheduledDate = schedDateObj.getDate();

          const startDateLocal = new Date(
            scheduledYear,
            scheduledMonth - 1,
            scheduledDate
          );
          const todayFull = new Date();
          const todayLocal = new Date(
            todayFull.getFullYear(),
            todayFull.getMonth(),
            todayFull.getDate()
          );

          const sessionsArr = [];
          for (
            let date = new Date(startDateLocal);
            date <= todayLocal;
            date.setDate(date.getDate() + 1)
          ) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            sessionsArr.push({
              work_date: `${yyyy}-${mm}-${dd}`,
              start_time: "",
              end_time: "",
              duration: 0,
            });
          }
          setWorkSessions(sessionsArr);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    const fetchParentProtocol = async () => {
      if (protocol && protocol.parent_ticket_id) {
        try {
          const res = await fetch(
            `/api/protocols/${protocol.parent_ticket_id}`,
            {
              credentials: "include",
            }
          );

          if (!res.ok)
            throw new Error("Błąd pobierania powiązanego zgłoszenia");
          const data = await res.json();
          setParentData(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchParentProtocol();
  }, [protocol]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/storage/Parts", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania listy części");
        const data = await res.json();
        setPartsList(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("pl-PL");
  };

  const handleTimeChange = (index, field, rawValue) => {
    let digits = rawValue.replace(/\D/g, "").slice(0, 4);
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }
    setWorkSessions((prev) => {
      const newArr = [...prev];
      newArr[index][field] = formatted;
      const { start_time, end_time } = newArr[index];
      if (/^\d{2}:\d{2}$/.test(start_time) && /^\d{2}:\d{2}$/.test(end_time)) {
        const startDate = new Date(`1970-01-01T${start_time}:00`);
        const endDate = new Date(`1970-01-01T${end_time}:00`);
        let diff = (endDate - startDate) / (1000 * 60);
        if (diff < 0) diff = 0;
        newArr[index].duration = diff;
      } else {
        newArr[index].duration = 0;
      }
      return newArr;
    });
  };

  const handleAddPart = () => {
    setUsedParts((prev) => [
      ...prev,
      { part_id: null, part_name: "", quantity: 1 },
    ]);
  };

  const handleRemovePart = (index) => {
    setUsedParts((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePartNameChange = (index, value) => {
    setUsedParts((prev) => {
      const newArr = [...prev];
      newArr[index].part_name = value;
      const found = partsList.find((p) => p.product === value);
      newArr[index].part_id = found ? found.id : null;
      return newArr;
    });
  };

  const handlePartQuantityChange = (index, value) => {
    const quantity = parseInt(value, 10);
    setUsedParts((prev) => {
      const newArr = [...prev];
      newArr[index].quantity = isNaN(quantity) ? 1 : quantity;
      return newArr;
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!protocol) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const closedDate = `${yyyy}-${mm}-${dd}`;

    try {
      const body = {
        closedDate,
        workSessions: workSessions.map((session) => ({
          work_date: session.work_date,
          start_time: session.start_time,
          end_time: session.end_time,
          duration: session.duration,
        })),
        usedParts: usedParts
          .filter((part) => part.part_id !== null)
          .map((part) => ({
            part_id: part.part_id,
            quantity_used: part.quantity,
          })),
      };
      const res = await fetch(`/api/protocols/closeProtocol/${protocol.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Nieznany błąd");

      alert("Protokół został zamknięty i dane zapisane!");
      setProtocol((prev) => ({
        ...prev,
        closed_at: closedDate,
        status: "closed",
      }));
      navigate(`/protocol/${id}`);
    } catch (err) {
      console.error("Błąd przy zamykaniu protokołu:", err);
      alert("Błąd: " + err.message);
    }
  }, [protocol, workSessions, usedParts]);

  if (loading) return <div>Ładowanie protokołu...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!protocol) return <div>Protokół nie znaleziony</div>;

  const typeText = protocol.type === "awaria" ? "Awaria" : "Montaż";
  const priorityIcon =
    protocol.priority === "Wysoki" ? (
      <High className="text-orange-700" />
    ) : protocol.priority === "Standardowy" ? (
      <Medium className="text-amber-400" />
    ) : (
      <Low className="text-lime-600" />
    );

  return (
    <div>
      <button
        className="absolute top-16 left-20 mb-8 px-5 py-1.5 cursor-pointer bg-white text-gray-600 border border-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-800 hover:border-gray-900 hover:duration-300"
        onClick={handleBackButton}
      >
        Cofnij
      </button>

      <div className="my-32 flex justify-center">
        <div className="grid grid-cols-2 w-2/3 px-10 py-10 rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
          <div>
            <h1 className="font-bold text-2xl text-stone-500">
              {protocol.ticket_number}
            </h1>

            <h1 className="flex items-center gap-3 mt-4 font-bold text-2xl">
              {protocol.company_name}{" "}
              <span className="relative group">
                {priorityIcon}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-opacity-60 bg-gray-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Priorytet: {protocol.priority}
                  <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-opacity-60 border-t-gray-500" />
                </div>
              </span>
            </h1>

            <h2 className="mt-2 mb-4 font-bold text-xl">
              {typeText}: {protocol.title}
            </h2>

            <div className="mx-4">
              <p className="mb-4 font-light">{protocol.description}</p>

              {protocol.has_device && (
                <div className="flex gap-2">
                  <Device />
                  Urządzenie:{" "}
                  <span className="font-bold">{protocol.device_name}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              {protocol.is_warranty && (
                <div className="mt-4 mb-2">
                  <div className="flex gap-2">
                    <Warranty />
                    Gwarancja
                  </div>
                </div>
              )}

              {protocol.parent_ticket_id && parentData && (
                <div className="flex gap-2 group hover:text-blue-700 underline mt-2">
                  <Protocol />
                  <Link
                    to={`/clientProtocol/${protocol.parent_ticket_id}`}
                    state={{ protocol: parentData }}
                  >
                    Powiązane zgłoszenie:{" "}
                    <span className="font-semibold text-stone-500 group-hover:text-blue-900">
                      {parentData.ticket_number}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-rows-2 text-right">
            <div>
              <div>
                Stworzono:{" "}
                <span className="font-semibold">
                  {formatDate(protocol.created_at)}
                </span>
              </div>

              {protocol.scheduled_at && (
                <div>
                  Zaplanowane na:{" "}
                  <span className="font-semibold">
                    {formatDate(protocol.scheduled_at)}
                  </span>
                </div>
              )}
              {protocol.closed_at && (
                <div>
                  Zamknięte:{" "}
                  <span className="font-semibold">
                    {formatDate(protocol.closed_at)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-2 self-end">
              <div className="flex justify-end gap-2 mt-1 mb-1.5">
                <PhoneIcon />
                Telefon:{" "}
                <span className="underline font-bold text-blue-500">
                  {protocol.phone_number}
                </span>
              </div>
              <div className="mt-1 mb-1.5">NIP: {protocol.nip}</div>
              <div className="mt-1">
                {protocol.address}
                <span className="ml-4 font-extralight">distance</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Rejestracja sesji roboczych</h3>
            {workSessions.map((session, index) => (
              <div
                key={session.work_date}
                className="flex items-center justify-between mb-2"
              >
                <div className="w-32 font-medium">
                  {(() => {
                    const [y, m, d] = session.work_date.split("-").map(Number);
                    return new Date(y, m - 1, d).toLocaleDateString("pl-PL");
                  })()}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="__ : __"
                    value={session.start_time}
                    onChange={(e) =>
                      handleTimeChange(index, "start_time", e.target.value)
                    }
                    className="border p-1 w-20 text-center rounded"
                  />
                  <span className="mx-4">–</span>
                  <input
                    type="text"
                    placeholder="__ : __"
                    value={session.end_time}
                    onChange={(e) =>
                      handleTimeChange(index, "end_time", e.target.value)
                    }
                    className="border p-1 w-20 text-center rounded"
                  />
                </div>
                <div className="w-32 text-right font-medium whitespace-nowrap">
                  {Math.floor(session.duration / 60)} h {session.duration % 60}{" "}
                  min
                </div>
              </div>
            ))}
          </div>

          <div className="ml-6 mt-6">
            <h3 className="font-semibold mb-2">Użyte części</h3>
            {usedParts.map((up, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 mb-2"
              >
                <input
                  type="text"
                  list="partsList"
                  placeholder="Wybierz część"
                  value={up.part_name}
                  onChange={(e) => handlePartNameChange(index, e.target.value)}
                  className="border p-1 w-2/3 rounded"
                />
                <datalist id="partsList">
                  {partsList.map((p) => (
                    <option key={p.id} value={p.product} />
                  ))}
                </datalist>

                <input
                  type="number"
                  min="1"
                  value={up.quantity}
                  onChange={(e) =>
                    handlePartQuantityChange(index, e.target.value)
                  }
                  className="border p-1 w-20 rounded text-center"
                />

                <button onClick={() => handleRemovePart(index)}>
                  <Delete />
                </button>
              </div>
            ))}
            <button onClick={handleAddPart}>
              <Add />
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="mt-3 px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
            >
              Zamknij protokół
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
