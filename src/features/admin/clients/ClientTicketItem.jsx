import { Link } from "react-router-dom";

export default function ClientTicketItem({ ticket, index }) {
  const isEven = index % 2 === 0;
  const status =
    ticket.status === "submitted"
      ? "Oczekujące"
      : ticket.status === "scheduled"
      ? "Zaplanowane"
      : "Zamknięte";

  return (
    <div
      className={`flex items-center justify-between whitespace-nowrap border rounded-xl mb-2 p-2 ${
        isEven ? "bg-gray-100" : "bg-gray-200"
      } `}
    >
      <div className="w-32 font-bold text-lg text-stone-500">
        {ticket.ticket_number}
      </div>
      <div className="w-64 font-bold truncate overflow-hidden">
        {ticket.title}
      </div>
      <div className="w-32">{status}</div>
      <Link to={`/protocol/${ticket.id}`}>
        <button
          className="px-5 py-2.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
          type="button"
        >
          Podgląd
        </button>
      </Link>
    </div>
  );
}
