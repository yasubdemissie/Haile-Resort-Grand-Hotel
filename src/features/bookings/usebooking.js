import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  if (error) {
    console.error(error);
    throw new Error("Error getting the data for " + id);
  }

  return { data, isLoading, error };
}
