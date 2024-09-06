import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: EditCabin, isLoading: editLoad } = useMutation({
    mutationFn: ({ cabin, id }) => addCabin(cabin, id),
    onSuccess: () => {
      toast.success("cabin edited successfully");
      // reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => toast.error("cabin has not been Edited"),
  });

  return { EditCabin, editLoad };
}
