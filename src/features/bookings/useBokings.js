import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const sortMethod = searchParams.get("sort-by") || "startDate-desc";
  const [field, value] = sortMethod.split("-");

  const sortBy = { field, value };

  let filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // let sort = !sortByValue || sortByValue === 'all' ? null : {field : 'sort-by', value: sortByValue, type: sortBy };
  const {
    data: { data, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const numberOfPages = Math.ceil(count / PAGE_SIZE);

  if (page !== numberOfPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { data, count, isLoading, error };
}
