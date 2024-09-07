import { useMutation } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email: userEmail, password: userPassword }) =>
      apiLogin(userEmail, userPassword),
    onSuccess: (data) => {
      toast.success("your have logged in successfully");
      console.log(data);
    },
    onError: (error) => {
      toast.error("There is an error. please check your username and password");
      console.error(error);
    },
  });

  return { login, isLoading };
}
