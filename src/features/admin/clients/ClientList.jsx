import { useEffect, useState } from "react";
import Searchbar from "../../../components/common/Searchbar.jsx";
import SortingFilter from "./SortingFilter.jsx";
import ClientItem from "./ClientItem.jsx";
import { useFilteredSortedData } from "../../../hooks/useFilteredSortedData.js";

const sortingFields = [
  { key: "company", label: "Nazwa firmy", type: "string" },
  { key: "date", label: "Data dołączenia", type: "date" },
  { key: "tickets", label: "Ilość zgłoszeń", type: "number" },
  { key: "priority", label: "Priorytet", type: "string" },
];

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(clients);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients/Clients", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Nie udało się pobrać klientów");
        }

        const data = await res.json();

        const formatted = data.map((item) => ({
          company: item.company_name,
          date: new Date(item.join_date).toLocaleDateString("pl-PL"),
          tickets: item.ticket_count,
          priority: item.priority,
        }));

        setClients(formatted);
      } catch (err) {
        console.error("Błąd pobierania klientów:", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="m-5 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-1 items-center h-20 px-4 border-b border-gray-400 pr-96">
        <Searchbar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <SortingFilter
        fields={sortingFields}
        onSortChange={(key, order) => {
          setSortKey(key);
          setSortOrder(order);
        }}
      />

      <div className="h-[600px] rounded-b-3xl overflow-y-auto scroll-smooth border-b border-gray-300">
        {filteredData.map((item, index) => (
          <ClientItem
            key={index}
            index={index}
            company={item.company}
            date={item.date}
            tickets={item.tickets}
            priority={item.priority}
          />
        ))}
      </div>
    </div>
  );
}
