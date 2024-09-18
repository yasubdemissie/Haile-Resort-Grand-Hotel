import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkContext = createContext();

function DarkModeContext({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");
  function toggleDarkMode() {
    setDarkMode((isDarkMode) => !isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkContext.Provider>
  );
}

export { DarkModeContext, DarkContext };
