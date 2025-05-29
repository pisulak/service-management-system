import { useEffect, useState } from "react";
import ProtocolItem from "./TodayProtocolItem.jsx";

export default function TodayProtocols() {
  const [todayData, setTodayData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const res = await fetch("/api/protocols/adminToday", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Nie udało się pobrać dzisiejszych zgłoszeń");
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
          date: new Date(protocol.scheduled_at).toLocaleDateString("pl-PL"),
        }));

        setTodayData(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div className="overflow-y-auto scroll-smooth">
      <div className="grid grid-cols-1 gap-6 m-5">
        {todayData.map((item, index) => (
          <ProtocolItem
            key={index}
            id={item.id}
            ticketNumber={item.ticketNumber}
            type={item.type}
            hasDevice={item.hasDevice}
            deviceName={item.deviceName}
            company={item.company}
            title={item.title}
            description={item.description}
            mobileNumber={item.mobileNumber}
            underWarranty={item.underWarranty}
            parentTicket={item.parentTicket}
            address={item.address}
            nip={item.nip}
            priority={item.priority}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
