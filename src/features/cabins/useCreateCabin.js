import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: createLoad } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("cabin has been created");
    //   reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => toast.error("cabin has not been created"),
  });

  return { createCabin, createLoad };
}
