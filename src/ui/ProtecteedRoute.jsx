import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../features/authentication/useLoggedUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

function ProtecteedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
}

export default ProtecteedRoute;
