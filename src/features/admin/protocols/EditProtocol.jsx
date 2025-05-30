import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";
import DateInput from "../../../components/common/DateInput.jsx";

export default function EditProtocol() {
  const { id } = useParams();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [parentData, setParentData] = useState(null);

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

        if (data.scheduled_at) {
          const datePart = data.scheduled_at.split("T")[0];
          setSelectedDate(datePart);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleScheduledUpdate = useCallback(async () => {
    if (!selectedDate) return alert("Wybierz poprawną datę");

    try {
      const res = await fetch(`/api/protocols/schedule/${protocol.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ scheduledDate: selectedDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Nieznany błąd");

      alert("Zaktualizowano datę wizyty");
      setProtocol((prev) => ({ ...prev, scheduled_at: selectedDate }));
    } catch (err) {
      console.error(err);
      alert("Błąd: " + err.message);
    }
  }, [protocol, selectedDate]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("pl-PL");
  };

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

      <h2 className="mb-4 font-bold text-xl">
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

        <div className="font-semibold">
          created: {formatDate(protocol.created_at)}
        </div>
        <div className="font-semibold">
          scheduled: {formatDate(protocol.scheduled_at)}
        </div>
        <div className="font-semibold">
          closed: {formatDate(protocol.closed_at)}
        </div>

        <div className="flex gap-2 mt-2 mb-1.5">
          <PhoneIcon />
          Telefon:{" "}
          <span className="underline font-bold text-blue-500">
            {protocol.phone_number}
          </span>
        </div>

        <div className="mt-2 mb-1.5">NIP: {protocol.nip}</div>

        <div className="mt-4 mb-2">
          {protocol.is_warranty && (
            <div className="flex gap-2">
              <Warranty />
              Gwarancja
            </div>
          )}
        </div>

        {protocol.parent_ticket_id && parentData && (
          <div className="flex gap-2 group hover:text-blue-700 underline">
            <Protocol />
            <Link
              to={`/protocols/${protocol.parent_ticket_id}`}
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

      <div className="mt-3">
        {protocol.address}
        <span className="mx-4 font-extralight">distance</span>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Zaplanuj datę wizyty</h3>
        <DateInput value={selectedDate} onChange={setSelectedDate} />
        <button
          onClick={handleScheduledUpdate}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
