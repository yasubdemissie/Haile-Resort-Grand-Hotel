import { useContext } from "react";
import { DarkContext } from "../ui/DarkModeContext";

function useDarkMode() {
    const context = useContext(DarkContext);
    if (!context) throw new Error("The context does not provide in this context");
    return context;
}

export default useDarkMode;