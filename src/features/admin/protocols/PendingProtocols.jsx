import React, { useEffect, useState } from "react";
import Sidebar from "../layout/AdminSidebar.jsx";
import Topbar from "../../../components/layout/Topbar.jsx";
import Searchbar from "../../../components/common/ProtocolSearchbar.jsx";
import ProtocolList from "./ProtocolList.jsx";
import {
  CalArrowDown,
  CalArrowUp,
} from "../../../components/icons/CalendarIcons.jsx";
import { sortProtocolsByDate } from "../../../utils/sortProtocols.js";

export default function PendingProtocols() {
  const [searchTerm, setSearchTerm] = useState("");
  const [protocolsData, setProtocolsData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchClosedProtocols = async () => {
      try {
        const res = await fetch("/api/protocols/adminSubmitted", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Nie udało się pobrać zgłoszeń");
        }

        const data = await res.json();

        const formatted = data.map((protocol) => ({
          id: protocol.id,
          ticketNumber: protocol.ticket_number,
          type: protocol.type,
          hasDevice: protocol.has_device,
          deviceName: protocol.device_name,
          company: protocol.company_name || "Nieznana firma",
          title: protocol.title,
          description: protocol.description,
          mobileNumber: protocol.phone_number || "Brak numeru",
          underWarranty: protocol.is_warranty,
          parentTicket: protocol.parent_ticket_id,
          address: protocol.address || "Brak adresu",
          nip: protocol.nip,
          priority: protocol.priority,
          date: new Date(protocol.created_at).toLocaleDateString("pl-PL"),
        }));

        setProtocolsData(formatted);
      } catch (error) {
        console.error("Błąd podczas ładowania danych:", error);
      }
    };

    fetchClosedProtocols();
  }, []);

  const sortedProtocols = sortProtocolsByDate(protocolsData, isAscending);

  const showButton = protocolsData.some((protocol) => {
    const [day, month, year] = protocol.date.split(".");
    const date = new Date(`${year}-${month}-${day}`);
    return !isNaN(date.getTime());
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div className="grid grid-cols-1 justify-items-center mb-5">
          <div className="px-5 w-5/6">
            <div className="mx-1 my-4 font-extrabold text-3xl">
              Oczekujące zgłoszenia
            </div>
            <div className="grid grid-cols-[5fr_1fr]">
              <Searchbar value={searchTerm} onChange={setSearchTerm} />
              {showButton && (
                <button
                  onClick={() => setIsAscending((prev) => !prev)}
                  className="mx-2 justify-self-end"
                >
                  {isAscending ? <CalArrowUp /> : <CalArrowDown />}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center h-[calc(100vh-200px)]">
          <ProtocolList
            searchTerm={searchTerm}
            protocolsData={sortedProtocols}
          />
        </div>
      </div>
    </div>
  );
}
