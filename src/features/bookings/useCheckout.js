import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, { status: "checked-out"}),
    onSuccess: () => {
      toast.success("The bill successfully updated");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => toast.error("Can't complete the task"),
  });

  return { mutate, isLoading };
}
