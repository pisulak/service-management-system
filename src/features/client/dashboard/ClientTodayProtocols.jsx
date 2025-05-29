import { useEffect, useState } from "react";
import ProtocolItem from "./ClientTodayProtocolItem.jsx";

export default function TodayProtocols() {
  const [todayData, setTodayData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const res = await fetch("/api/protocols/clientToday", {
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
          title: protocol.title,
          description: protocol.description,
          underWarranty: protocol.is_warranty,
          parentTicket: protocol.parent_ticket_id,
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
            title={item.title}
            description={item.description}
            underWarranty={item.underWarranty}
            parentTicket={item.parentTicket}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
