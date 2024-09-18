import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { Flag } from "../../ui/Flag";
import propType from "prop-types";
import { Link } from "react-router-dom";
import { useCheckout } from "../bookings/useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { mutate: checkout, isLoading } = useCheckout();

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departed</Tag>}
      <Flag src={guests.countryFlag} alt="unknown" />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} Nights</div>
      {status === "unconfirmed" && (
        <Button size="small" type="primary" as={Link} to={`/checkin/${id}`}>
          check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          disabled={isLoading}
          size="small"
          type="primary"
          onClick={() => checkout(id)}
        >
          {isLoading ? <SpinnerMini /> : "Check out"}
        </Button>
      )}
    </StyledTodayItem>
  );
}

TodayItem.propTypes = {
  activity: propType.object,
};

export default TodayItem;
