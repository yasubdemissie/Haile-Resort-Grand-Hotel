import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBoking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [check, setCheck] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const moveBack = useMoveBack();
  // const { id } = useParams();

  const { data: booking, isLoading } = useBooking();
  const { mutate, isLoading: isMutating } = useCheckin();
  const { settings: { breakfastPrice } = {}, isLoading: isSetting } =
    useSettings();

  useEffect(() => setCheck(() => booking?.isPaid ?? false), [booking?.isPaid]);
  // const { status, id : bookingId } = booking;
  function handleCheckin() {
    if (!check) return;
    mutate({
      extrasPrice: totalBreakfastPrice,
      totalPrice: totalPrice + totalBreakfastPrice,
    });
  }

  if (isLoading || isMutating || isSetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const totalBreakfastPrice = numGuests * numNights * breakfastPrice;
  // function handleBreakfast() {
  //   return totalBreakfastPrice;
  // }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            // disabled={breakfast === true}
            onChange={() => {
              setBreakfast((value) => !value);
              setCheck(false);
            }}
          >
            Add Breakfast payment {formatCurrency(totalBreakfastPrice)}{" "}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          disabled={check === true}
          checked={check}
          onChange={() => setCheck((check) => !check)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!totalBreakfastPrice
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + totalBreakfastPrice)}
          {breakfast &&
            ` which is (${
              formatCurrency(totalPrice) +
              " + " +
              formatCurrency(totalBreakfastPrice)
            })`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
