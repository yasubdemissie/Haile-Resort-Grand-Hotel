import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useActivityToday() {
    const { data: activity, isLoading, error } = useQuery({
        queryKey: ['today-activity'],
        queryFn: getStaysTodayActivity,
    });
    if (error) toast.error(error.message);

    return { activity, isLoading };
}