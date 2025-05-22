import { getSortingIcon } from "../../../utils/storageSortingUtils";
import { useSortingFilter } from "../../../hooks/useSortingFilter";

export default function SortingFilter({ fields, onSortChange }) {
  const { sortKey, sortOrder, toggleSort } = useSortingFilter(onSortChange);

  return (
    <div className="grid grid-cols-12 gap-3 items-center py-4 px-6 font-extralight text-sm text-gray-600 border-b border-gray-300">
      {fields.map(({ key, label, type }) => {
        const isActive = sortKey === key;
        const alignment =
          key === "code" || key === "product" || key === "description"
            ? "col-span-2 text-left"
            : "col-span-1 justify-end text-right";

        return (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`flex items-center gap-2 text-sm hover:underline ${alignment}`}
          >
            <span className="truncate overflow-hidden whitespace-nowrap">
              {label}
            </span>
            <div className="w-4 h-4">
              {getSortingIcon(type, isActive, sortOrder)}
            </div>
          </button>
        );
      })}
    </div>
  );
}
