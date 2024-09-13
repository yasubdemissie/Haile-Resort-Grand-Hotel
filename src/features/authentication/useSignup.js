import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUp({ email, password, fullName }),
    onSuccess: () => {
      toast.success("Your account has been registered successfully");
    },
    onError: (err) => toast.error(err),
  });

  return { signup, isLoading };
}
