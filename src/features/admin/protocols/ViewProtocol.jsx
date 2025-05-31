import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Protocol,
  Warranty,
  PhoneIcon,
  Device,
} from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";

export default function ViewProtocol() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parentData, setParentData] = useState(null);

  function handleBackButton() {
    navigate(`/dashboard`);
  }

  useEffect(() => {
    const fetchProtocol = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/protocols/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania protokołu");
        const data = await res.json();
        setProtocol(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProtocol();
    }
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

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("pl-PL");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const parts = timeString.split(":");
    return parts.slice(0, 2).join(":");
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
      <button onClick={handleBackButton}>cofnij</button>
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

        {protocol.scheduled_at && (
          <div className="font-semibold">
            scheduled: {formatDate(protocol.scheduled_at)}
          </div>
        )}
        {protocol.closed_at && (
          <div className="font-semibold">
            closed: {formatDate(protocol.closed_at)}
          </div>
        )}

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
          <div className="flex gap-2 group hover:text-blue-700 underline mt-2">
            <Protocol />
            <Link
              to={`/protocol/${protocol.parent_ticket_id}`}
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

      {protocol.work_sessions && protocol.work_sessions.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Sesje robocze</h3>
          <div className="space-y-2">
            {protocol.work_sessions.map((ws, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border p-2 rounded bg-gray-50"
              >
                <div className="w-32 font-medium">
                  {formatDate(ws.work_date)}
                </div>
                <div className="w-24 text-center">
                  {formatTime(ws.start_time)} – {formatTime(ws.end_time)}
                </div>
                <div className="ml-4 w-16 font-medium">{ws.duration} h</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {protocol.used_parts && protocol.used_parts.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Użyte części</h3>
          <div className="space-y-2">
            {protocol.used_parts.map((part, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border p-2 rounded bg-gray-50"
              >
                <div className="w-48 font-medium">{part.product}</div>
                <div className="w-24 text-center">
                  {part.quantity_used} × {part.code}
                </div>
                <div className="ml-auto font-medium">{part.price} zł</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {protocol.status === "submitted" ? (
        <Link to={`/editProtocol/${id}`} state={{ protocol: { id } }}>
          <button
            className="mt-3 px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
            type="button"
          >
            Zaplanuj wizytę
          </button>
        </Link>
      ) : protocol.status === "scheduled" ? (
        <Link to={`/closeProtocol/${id}`} state={{ protocol: { id } }}>
          <button
            className="mt-3 px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
            type="button"
          >
            Zamknij zgłoszenie
          </button>
        </Link>
      ) : null}
    </div>
  );
}
