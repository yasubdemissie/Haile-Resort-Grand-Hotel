import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./statistics";
import propType from "prop-types";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabins }) {
  const numBookings = bookings?.length;
  const checkins = confirmedStays?.length;
  const sales = bookings?.reduce((acc, book) => acc + book.totalPrice, 0);
  const occupation =
    confirmedStays?.reduce((acc, book) => acc + book.numNights, 0) /
    (numDays * cabins?.length);

  return (
    <>
      <Stat
        title={"Booking"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check-ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Occupation Rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: propType.arrayOf(propType.object),
  confirmedStays: propType.arrayOf(propType.object),
  cabins: propType.arrayOf(propType.object),
  numDays: propType.number,
};

export default Stats;
