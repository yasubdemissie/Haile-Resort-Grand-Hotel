import { useEffect, useRef } from "react";

export function useClickOutside(handler) {
  const element = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (element.current && !element.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handler]);
  return element;
}
