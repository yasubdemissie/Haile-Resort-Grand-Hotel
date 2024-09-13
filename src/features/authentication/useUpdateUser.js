import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending: isUpdating,  } = useMutation({
    mutationFn: ({ avatar, fullName, password }) => updateUserData({ avatar, fullName, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(data.user);
      toast.success("User has been updated");
      queryClient.invalidateQueries();
    },
    onError: (err) => toast.error(err),
  });

  return { update, isUpdating };
}
