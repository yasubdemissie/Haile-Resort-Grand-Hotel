import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
    //   navigate(`/`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error(`Booking could not be deleted`);
      throw new Error(`Booking could not be deleted`);
    },
  });

  return { mutate, isLoading, error };
}
