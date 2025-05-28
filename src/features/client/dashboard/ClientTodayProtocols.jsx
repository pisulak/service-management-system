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
          company: protocol.company_name || "Nieznana firma",
          title: protocol.title,
          description: protocol.description,
          mobileNumber: protocol.phone_number || "Brak numeru",
          underWarranty: protocol.is_warranty,
          isRecall: !!protocol.parent_id,
          address: protocol.address || "Brak adresu",
          distance: protocol.distance || "-",
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
            company={item.company}
            title={item.title}
            description={item.description}
            mobileNumber={item.mobileNumber}
            underWarranty={item.underWarranty}
            isRecall={item.isRecall}
            address={item.address}
            distance={item.distance}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
