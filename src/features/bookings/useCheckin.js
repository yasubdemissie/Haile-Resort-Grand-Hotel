import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function useCheckin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (obj) =>
      updateBooking(id, { status: "checked-in", isPaid: true, ...obj }),
    onSuccess: () => {
      toast.success("The bill successfully updated");
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => toast.error("Can't complete the task"),
  });

  return { mutate, isLoading };
}
