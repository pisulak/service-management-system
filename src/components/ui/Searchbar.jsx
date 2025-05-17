import { SearchIcon } from "../icons/SearchIcon";

export default function Searchbar({ value, onChange }) {
  return (
    <div className="justify-self-center w-11/12 h-1/2 rounded-xl bg-gray-100 shadow-[inset_0px_0px_20px_0px_rgba(0,0,0,0.05)] flex items-center px-4">
      <SearchIcon className="text-gray-500 mr-2" />
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
