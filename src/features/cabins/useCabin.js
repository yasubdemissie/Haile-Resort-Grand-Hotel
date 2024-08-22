import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabin() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
      return { data, isLoading, error };
}