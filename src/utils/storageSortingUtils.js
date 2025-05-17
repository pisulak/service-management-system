import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDown10,
  ArrowUp10,
} from "../components/icons/SortingIcons";

export function getSortingIcon(type, isActive, order) {
  if (type === "number") {
    return isActive && order === "desc" ? (
      <ArrowDown10 className="w-4 h-4" />
    ) : (
      <ArrowUp10 className="w-4 h-4" />
    );
  } else {
    return isActive && order === "desc" ? (
      <ArrowDownAZ className="w-4 h-4" />
    ) : (
      <ArrowUpAZ className="w-4 h-4" />
    );
  }
}
