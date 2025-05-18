import { SearchIcon } from "../icons/SearchIcon";

export default function Searchbar({ value, onChange }) {
  return (
    <div className="flex items-center bg-gray-300 rounded-xl px-4 py-2 w-full border border-gray-400">
      <SearchIcon className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder="Wyszukaj..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent focus:outline-none w-full"
      />
    </div>
  );
}
