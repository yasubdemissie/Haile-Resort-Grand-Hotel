import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "../ui/ButtonIcon";
import useDarkMode from "../services/useDarkMode";

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun />  : <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle
