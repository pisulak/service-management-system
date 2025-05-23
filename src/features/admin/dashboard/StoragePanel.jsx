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

const initialData = [
  {
    code: "21-1234-1001",
    product: "Wiertarka udarowa",
    price: 299.99,
    quantity: 50,
  },
  {
    code: "21-1234-1002",
    product: "Szlifierka kątowa",
    price: 219.49,
    quantity: 70,
  },
  {
    code: "21-1234-1003",
    product: "Młot udarowy",
    price: 789.0,
    quantity: 30,
  },
  {
    code: "21-1234-1004",
    product: "Wkrętarka akumulatorowa",
    price: 159.95,
    quantity: 120,
  },
  {
    code: "21-1234-1005",
    product: "Piła tarczowa",
    price: 339.9,
    quantity: 0,
  },
  {
    code: "21-1234-1006",
    product: "Narzędzie wielofunkcyjne",
    price: 179.0,
    quantity: 65,
  },
  {
    code: "21-1234-1007",
    product: "Odkurzacz przemysłowy",
    price: 489.99,
    quantity: 25,
  },
  {
    code: "21-1234-1008",
    product: "Zestaw kluczy nasadowych",
    price: 249.0,
    quantity: 150,
  },
  {
    code: "21-1234-1009",
    product: "Poziomica laserowa",
    price: 199.99,
    quantity: 80,
  },
  {
    code: "21-1234-1010",
    product: "Kompresor olejowy",
    price: 699.0,
    quantity: 15,
  },
];

export default function StoragePanel() {
  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(initialData);

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
    </div>
  );
}
