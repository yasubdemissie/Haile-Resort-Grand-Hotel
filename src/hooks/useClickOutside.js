import { useEffect, useRef } from "react";

export function useClickOutside(handler, listeningPhase = true) {
  const element = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (element.current && !element.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listeningPhase);
    return () => document.removeEventListener("click", handleClick, listeningPhase);
  }, [handler, listeningPhase]);
  return element;
}
