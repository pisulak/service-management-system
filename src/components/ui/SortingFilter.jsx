import { getSortingIcon } from "../../utils/storageSortingUtils";
import { useSortingFilter } from "../../hooks/useSortingFilter";

export default function SortingFilter({ fields, onSortChange }) {
  const { sortKey, sortOrder, toggleSort } = useSortingFilter(onSortChange);

  return (
    <div className="grid grid-cols-4 items-center py-4 px-6 font-extralight text-sm text-gray-600 border-b border-gray-300">
      {fields.map(({ key, label, type }) => {
        const isActive = sortKey === key;
        const alignment =
          key === "price" || key === "quantity"
            ? "justify-end text-right"
            : "justify-start text-left";

        return (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`flex items-center gap-2 text-sm hover:underline ${alignment}`}
          >
            {label}
            {getSortingIcon(type, isActive, sortOrder)}
          </button>
        );
      })}
    </div>
  );
}
