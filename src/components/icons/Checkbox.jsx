import { Check, X } from "lucide-react";

export function CheckIconBox({ label }) {
  return (
    <span className="flex items-center gap-2">
      <Check
        className="rounded-md bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.2)] text-black p-1"
        strokeWidth={2}
      />
      {label}
    </span>
  );
}

export function CrossIconBox({ label }) {
  return (
    <span className="flex items-center gap-2">
      <X
        className="rounded-md bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.2)] text-black p-1"
        strokeWidth={2}
      />
      {label}
    </span>
  );
}
