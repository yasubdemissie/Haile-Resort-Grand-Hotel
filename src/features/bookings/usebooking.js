import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  if (error) {
    console.error(error);
    throw new Error("Error getting the data for " + id);
  }

  return { data, isLoading };
}
