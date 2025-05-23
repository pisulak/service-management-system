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

const initialData = [
  {
    company: "Tech Solutions Sp. z o.o.",
    date: "2023-01-15",
    tickets: 34,
    priority: "Wysoki",
  },
  {
    company: "InnoSoft",
    date: "2022-11-03",
    tickets: 12,
    priority: "Standardowy",
  },
  {
    company: "NetWare Polska",
    date: "2021-06-27",
    tickets: 58,
    priority: "Niski",
  },
  {
    company: "AlphaBit Systems",
    date: "2023-03-22",
    tickets: 8,
    priority: "Brak",
  },
  {
    company: "GreenData",
    date: "2020-09-10",
    tickets: 91,
    priority: "Niski",
  },
  {
    company: "DigitalCore",
    date: "2022-05-17",
    tickets: 26,
    priority: "Wysoki",
  },
  {
    company: "SmartApps Inc.",
    date: "2021-12-01",
    tickets: 44,
    priority: "Standardowy",
  },
  {
    company: "Cloudify",
    date: "2023-02-10",
    tickets: 15,
    priority: "Brak",
  },
  {
    company: "NextGen IT",
    date: "2022-07-29",
    tickets: 73,
    priority: "Niski",
  },
  {
    company: "SynergyTech",
    date: "2021-10-08",
    tickets: 19,
    priority: "Wysoki",
  },
  {
    company: "VisionWare Group",
    date: "2020-03-05",
    tickets: 37,
    priority: "Standardowy",
  },
  {
    company: "ByteForge Technologies",
    date: "2023-08-18",
    tickets: 62,
    priority: "Niski",
  },
];

export default function ClientList() {
  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(initialData);

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
