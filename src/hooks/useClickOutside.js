import { useEffect } from "react";

export function useClickOutside(element, handler) {
  useEffect(() => {
    function handleClick(e) {
      if (element.current && !element.current.contains(e.target)) {
        handler("");
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [element]);
  return null;
}
