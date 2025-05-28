import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientAddProtocolPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("awaria");
  const [hasDevice, setHasDevice] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [isWarranty, setIsWarranty] = useState(false);
  const [isAppeal, setIsAppeal] = useState(false);
  const [parentTicketId, setParentTicketId] = useState("");

  const [closedProtocols, setClosedProtocols] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAppeal) {
      fetch("/api/protocols/clientClosed", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setClosedProtocols(data))
        .catch(() => setClosedProtocols([]));
    }
  }, [isAppeal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/protocols/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          type,
          hasDevice,
          deviceName,
          isWarranty,
          parentTicketId: isAppeal ? parentTicketId || null : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setSuccess("Protokół został dodany!");
      setTimeout(() => navigate("/clientDashboard"), 1500);
    } catch (err) {
      setError(err.message || "Wystąpił błąd");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Dodaj nowy protokół</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="awaria">Awaria</option>
          <option value="montaz">Montaż</option>
        </select>

        <label className="block">
          <input
            type="checkbox"
            checked={hasDevice}
            onChange={(e) => setHasDevice(e.target.checked)}
          />
          <span className="ml-2">Dotyczy urzędzenia</span>
        </label>

        {hasDevice && (
          <input
            type="text"
            placeholder="Nazwa urządzenia"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}

        <label className="block">
          <input
            type="checkbox"
            checked={isWarranty}
            onChange={(e) => setIsWarranty(e.target.checked)}
          />
          <span className="ml-2">Gwarancja</span>
        </label>

        <label className="block mt-4">
          <input
            type="checkbox"
            checked={isAppeal}
            onChange={(e) => setIsAppeal(e.target.checked)}
          />
          <span className="ml-2 font-semibold">Czy jest to odwołanie?</span>
        </label>

        {isAppeal && (
          <select
            value={parentTicketId}
            onChange={(e) => setParentTicketId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Wybierz zamknięty protokół</option>
            {closedProtocols.length === 0 && (
              <option disabled>Brak zamkniętych protokołów</option>
            )}
            {closedProtocols.map((protocol) => (
              <option key={protocol.id} value={protocol.id}>
                {protocol.ticket_number} - {protocol.title}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Wyślij protokół
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
