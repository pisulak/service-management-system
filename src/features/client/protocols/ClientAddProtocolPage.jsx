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

  function handleBackButton() {
    navigate(-1);
  }

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
    <div>
      <button
        className="absolute top-16 left-20 mb-8 px-5 py-1.5 cursor-pointer bg-white text-gray-600 border border-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-800 hover:border-gray-900 hover:duration-300"
        onClick={handleBackButton}
      >
        Cofnij
      </button>

      <div className="mt-32 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="fixed grid grid-cols-1 w-1/3 px-5 py-10 text-center rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]"
        >
          <h1 className="mb-4 text-3xl font-bold">Wyślij nowe zgłoszenie</h1>
          <input
            className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
            type="text"
            placeholder="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200 resize-none"
            placeholder="Opis"
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="justify-self-start w-2/3 my-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="awaria">Awaria</option>
            <option value="montaz">Montaż</option>
          </select>

          <label className="justify-self-start ">
            <input
              type="checkbox"
              checked={hasDevice}
              onChange={(e) => setHasDevice(e.target.checked)}
            />
            <span className="ml-2">Dotyczy urzędzenia</span>
          </label>

          {hasDevice && (
            <input
              className="w-2/3 justify-self-start mt-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
              type="text"
              placeholder="Nazwa urządzenia"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          )}

          <label className="justify-self-start my-4">
            <input
              type="checkbox"
              checked={isWarranty}
              onChange={(e) => setIsWarranty(e.target.checked)}
            />
            <span className="ml-2">Gwarancja</span>
          </label>

          <label className="justify-self-start">
            <input
              type="checkbox"
              checked={isAppeal}
              onChange={(e) => setIsAppeal(e.target.checked)}
            />
            <span className="ml-2 ">Czy jest to odwołanie?</span>
          </label>

          {isAppeal && (
            <select
              className="justify-self-start w-2/3 my-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
              value={parentTicketId}
              onChange={(e) => setParentTicketId(e.target.value)}
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
            className="justify-self-center w-1/3 mt-6 px-4 py-1.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
          >
            Wyślij zgłoszenie
          </button>

          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
