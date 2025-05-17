import Filter from "../icons/Filter";
import Searchbar from "../ui/Searchbar";
import SortingFilter from "../ui/SortingFilter";
import Product from "../product/Product";
import { useFilteredSortedData } from "../../hooks/useFilteredSortedData";

const sortingFields = [
  { key: "code", label: "Numer ref", type: "string" },
  { key: "product", label: "Nazwa produktu", type: "string" },
  { key: "price", label: "Cena", type: "number" },
  { key: "quantity", label: "Ilość", type: "number" },
];

const initialData = [
  {
    code: "21-1234-1234",
    product: "Nazwa produktu",
    price: 1456.27,
    quantity: 100,
  },
  {
    code: "41-1234-1234",
    product: "Z Nazwa produktu",
    price: 21456.27,
    quantity: 1100,
  },
  {
    code: "1-1234-1234",
    product: "0 Nazwa produktu",
    price: 6.27,
    quantity: 9,
  },
  {
    code: "21-1234-1234",
    product: "Nazwa produktu",
    price: 1456.27,
    quantity: 100,
  },
  {
    code: "41-1234-1234",
    product: "Z Nazwa produktu",
    price: 21456.27,
    quantity: 1100,
  },
  {
    code: "1-1234-1234",
    product: "10 Nazwa produktu",
    price: 6.27,
    quantity: 5,
  },
  {
    code: "21-1234-1234",
    product: "Nazwa produktu",
    price: 1456.27,
    quantity: 100,
  },
  {
    code: "41-1234-1234",
    product: "Z Nazwa produktu",
    price: 21456.27,
    quantity: 1100,
  },
  {
    code: "1-1234-1234",
    product: "Nazwa produktu",
    price: 6.27,
    quantity: 10,
  },
];

export default function MiniStorage() {
  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredData,
  } = useFilteredSortedData(initialData);

  return (
    <div className="h-[calc(100%-20px)] m-5 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-[8fr_1fr] items-center h-20 border-b border-gray-400">
        <Searchbar value={searchTerm} onChange={setSearchTerm} />
        <Filter />
      </div>

      <SortingFilter
        fields={sortingFields}
        onSortChange={(key, order) => {
          setSortKey(key);
          setSortOrder(order);
        }}
      />

      <div className="h-[calc(6*56px)] overflow-y-auto scroll-smooth border-b border-gray-300">
        {filteredData.map((item, index) => (
          <Product
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
