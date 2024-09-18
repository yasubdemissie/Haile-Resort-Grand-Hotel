import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  
  const { bookings, isLoading1 } = useRecentBookings();
  const { isLoading2, confirmedStays, numDays } = useRecentStays();
  const { data: cabins, isLoading3 } = useCabin();

  if ( isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabins={cabins} numDays={numDays} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
