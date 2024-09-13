import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email: userEmail, password: userPassword }) =>
      apiLogin({ userEmail, userPassword }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.user]);
      navigate("/dashboard", { replace: true });
      toast.success("your have logged in successfully");
    },
    onError: () => {
      toast.error("There is an error. please check your username and password");
    },
  });

  return { login, isLoading };
}
