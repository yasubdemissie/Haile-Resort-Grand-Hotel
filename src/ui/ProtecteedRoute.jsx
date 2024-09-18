import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../features/authentication/useLoggedUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const StyledRoute = styled.div`
  height: 100dvh;
  width: 100%;

  display: flex;
  top: 50%;
  left: 50%;

  /* transform: translate(-50%, 50%); */
  align-items: center;
  justify-content: center;

  background-color: var(--color-grey-0);
`;

function ProtecteedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading)
    return (
      <StyledRoute>
        <Spinner />
      </StyledRoute>
    );

  if (isAuthenticated) return children;
}

export default ProtecteedRoute;
