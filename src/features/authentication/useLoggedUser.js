import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiLogin";

export function useLoggedUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
