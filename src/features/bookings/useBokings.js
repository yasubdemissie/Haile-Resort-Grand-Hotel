import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('status');
    // const [sortBy, sortByValue] = searchParams.get('sort-by')?.split('-');

    let filter = !filterValue || filterValue === 'all' ? null : {field : 'status', value: filterValue };
    // let sort = !sortByValue || sortByValue === 'all' ? null : {field : 'sort-by', value: sortByValue, type: sortBy };
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({filter}),
  });
  console.log(data, isLoading, error);
  return { data, isLoading, error };
}
