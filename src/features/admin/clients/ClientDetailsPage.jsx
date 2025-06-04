import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Protocol, PhoneIcon } from "../../../components/icons/ProtocolIcons";
import { High, Medium, Low } from "../../../components/icons/PriorityIcons";
import { Address, Nip } from "../../../components/icons/ClientIcons";
import ClientTicketItem from "./ClientTicketItem.jsx";

export default function ClientDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);

  function handleBackButton() {
    navigate(`/clients`);
  }

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/clientDetails/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania danych klienta");
        const data = await res.json();
        setClient(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`/api/protocols/adminClientTickets/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania zgłoszeń");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchTickets();
    }
  }, [id]);

  if (error) return <div>Błąd: {error}</div>;
  if (!client) return <div>Ładowanie danych klienta...</div>;

  const priorityIcon =
    client.priority === "Wysoki" ? (
      <High className="text-orange-700" />
    ) : client.priority === "Standardowy" ? (
      <Medium className="text-amber-400" />
    ) : (
      <Low className="text-lime-600" />
    );

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("pl-PL");
  };

  return (
    <div>
      <button
        className="absolute top-16 left-20 mb-8 px-5 py-1.5 cursor-pointer bg-white text-gray-600 border border-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-800 hover:border-gray-900 hover:duration-300"
        onClick={handleBackButton}
      >
        Cofnij
      </button>
      <div className="my-32 flex justify-center">
        <div className="grid grid-cols-[2fr_1fr] w-2/3 px-10 py-6 rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
          <div>
            <h1 className="font-bold text-2xl">Dane klienta</h1>

            <h1 className="flex items-center gap-3 mt-4 font-bold text-xl">
              {client.company_name}{" "}
              <span className="relative group">
                {priorityIcon}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-opacity-60 bg-gray-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Priorytet: {client.priority}
                  <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-opacity-60 border-t-gray-500" />
                </div>
              </span>
            </h1>

            <div className="flex gap-2 mt-6 mb-1.5">
              <PhoneIcon />
              Telefon:{" "}
              <span className="underline font-bold text-blue-500">
                {client.phone_number}
              </span>
            </div>
            <div className="flex gap-2 mt-1 mb-1.5">
              <Nip />
              NIP: <span className="font-semibold">{client.nip}</span>
            </div>
            <div className="flex gap-2 mt-2 mb-1.5">
              <Address />
              {client.address}
              <span className="ml-4 font-extralight">distance</span>
            </div>

            {tickets.length !== 0 && (
              <div className="w-[100%] mt-6">
                <div className="font-semibold text-xl mb-3">
                  Zgłoszenia klienta:
                </div>
                {tickets.map((ticket, index) => (
                  <ClientTicketItem
                    key={ticket.id}
                    ticket={ticket}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="text-right">
            Data dołączenia:{" "}
            <span className="font-semibold">
              {formatDate(client.join_date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
