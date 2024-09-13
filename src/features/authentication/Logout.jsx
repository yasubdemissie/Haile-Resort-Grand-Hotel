import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoading } = useLogout();

  if (isLoading) return <Spinner />;
  return (
    <ButtonIcon title="log out" onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
