import { useEffect, useState } from "react";
import Searchbar from "../../../components/common/Searchbar";
import SortingFilter from "./SortingFilter";
import ProductItem from "./ProductItem";
import { useFilteredSortedData } from "../../../hooks/useFilteredSortedData";

const sortingFields = [
  { key: "code", label: "Numer ref", type: "string" },
  { key: "product", label: "Nazwa produktu", type: "string" },
  { key: "description", label: "Opis", type: "string" },
  { key: "length", label: "Długość", type: "number" },
  { key: "width", label: "Szerokość", type: "number" },
  { key: "height", label: "Wysokość", type: "number" },
  { key: "weight", label: "Waga", type: "number" },
  { key: "price", label: "Cena", type: "number" },
  { key: "quantity", label: "Ilość", type: "number" },
];

export default function StoragePanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook do filtrowania/sortowania
  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/storage/Parts", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Nie udało się pobrać danych z magazynu");
        }

        const parts = await res.json();
        setData(parts);
      } catch (err) {
        console.error("Błąd ładowania danych:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        {loading ? (
          <div className="p-4">Ładowanie danych...</div>
        ) : (
          filteredData.map((item, index) => (
            <ProductItem
              key={index}
              index={index}
              code={item.code}
              product={item.product}
              description={item.description}
              length={item.length}
              width={item.width}
              height={item.height}
              weight={item.weight}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}
