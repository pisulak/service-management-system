import { useEffect, useState } from "react";
import Searchbar from "../../../components/common/Searchbar.jsx";
import SortingFilter from "../storage/MiniSortingFilter.jsx";
import ProductItem from "../storage/MiniProductItem.jsx";
import { useFilteredSortedData } from "../../../hooks/useFilteredSortedData.js";

const sortingFields = [
  { key: "code", label: "Numer ref", type: "string" },
  { key: "product", label: "Nazwa produktu", type: "string" },
  { key: "price", label: "Cena", type: "number" },
  { key: "quantity", label: "Ilość", type: "number" },
];

export default function StoragePanel() {
  const [rawData, setRawData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await fetch("/api/storage/Parts", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Błąd pobierania części z magazynu");
        const data = await res.json();
        setRawData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchParts();
  }, []);

  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(rawData);

  return (
    <div className="h-[calc(100%-20px)] m-5 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-1 items-center h-20 border-b border-gray-400 pr-32">
        <Searchbar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <SortingFilter
        fields={sortingFields}
        onSortChange={(key, order) => {
          setSortKey(key);
          setSortOrder(order);
        }}
      />

      {error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        <div className="h-[calc(6*62px)] overflow-y-auto scroll-smooth border-b border-gray-300">
          {filteredData.map((item, index) => (
            <ProductItem
              key={index}
              index={index}
              code={item.code}
              product={item.product}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
