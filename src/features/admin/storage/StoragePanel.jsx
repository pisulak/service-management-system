import Filter from "../../../components/icons/Filter";
import Searchbar from "../../../components/common/Searchbar";
import SortingFilter from "./SortingFilter";
import Product from "./ProductItem";
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

const initialData = [
  {
    code: "21-1234-1001",
    product: "Wiertarka udarowa",
    description: "Mocna wiertarka do betonu i cegły",
    length: 350,
    width: 80,
    height: 220,
    weight: 2.5,
    price: 299.99,
    quantity: 50,
  },
  {
    code: "21-1234-1002",
    product: "Szlifierka kątowa",
    description: "Szlifierka z regulacją obrotów",
    length: 400,
    width: 90,
    height: 180,
    weight: 2.2,
    price: 219.49,
    quantity: 70,
  },
  {
    code: "21-1234-1003",
    product: "Młot udarowy",
    description: "Profesjonalny młot do prac rozbiórkowych",
    length: 450,
    width: 120,
    height: 250,
    weight: 5.4,
    price: 789.0,
    quantity: 30,
  },
  {
    code: "21-1234-1004",
    product: "Wkrętarka akumulatorowa",
    description: "Bezprzewodowa wkrętarka litowo-jonowa",
    length: 200,
    width: 70,
    height: 190,
    weight: 1.3,
    price: 159.95,
    quantity: 120,
  },
  {
    code: "21-1234-1005",
    product: "Piła tarczowa",
    description: "Piła do drewna z prowadnicą",
    length: 420,
    width: 100,
    height: 220,
    weight: 4.1,
    price: 339.9,
    quantity: 0,
  },
  {
    code: "21-1234-1006",
    product: "Narzędzie wielofunkcyjne",
    description: "Do cięcia, szlifowania i skrobania",
    length: 300,
    width: 85,
    height: 200,
    weight: 2.0,
    price: 179.0,
    quantity: 65,
  },
  {
    code: "21-1234-1007",
    product: "Odkurzacz przemysłowy",
    description: "Do pracy na mokro i sucho",
    length: 500,
    width: 300,
    height: 600,
    weight: 6.8,
    price: 489.99,
    quantity: 25,
  },
  {
    code: "21-1234-1008",
    product: "Zestaw kluczy nasadowych",
    description: "Zestaw 94 elementów w walizce",
    length: 400,
    width: 90,
    height: 80,
    weight: 3.6,
    price: 249.0,
    quantity: 150,
  },
  {
    code: "21-1234-1009",
    product: "Poziomica laserowa",
    description: "Zasięg do 20 metrów, samopoziomująca",
    length: 150,
    width: 50,
    height: 60,
    weight: 0.8,
    price: 199.99,
    quantity: 80,
  },
  {
    code: "21-1234-1010",
    product: "Kompresor olejowy",
    description: "Kompresor 50L z manometrem",
    length: 700,
    width: 300,
    height: 600,
    weight: 23.0,
    price: 699.0,
    quantity: 15,
  },
];

export default function Storage() {
  const { searchTerm, setSearchTerm, setSortKey, setSortOrder, filteredData } =
    useFilteredSortedData(initialData);

  return (
    <div className="m-5 bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-[5fr_3fr] items-center h-20 px-4 border-b border-gray-400">
        <Searchbar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex justify-end mx-3">
          <Filter />
        </div>
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
          <Product
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
        ))}
      </div>
    </div>
  );
}
