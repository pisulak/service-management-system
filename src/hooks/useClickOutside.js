import { useEffect } from "react";

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref, handler]);
}
