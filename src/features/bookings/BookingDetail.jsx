import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useBooking } from "./useBooking";
import { useCheckout } from "./useCheckout";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: ischeckingout } = useCheckout();
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading || ischeckingout || isDeleting) return <Spinner />;

  const { status, id: bookingId } = data;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <Modal>
        <ButtonGroup>
          <Modal.Open name="deleteBooking">
            <Button type="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName={bookingId}
              onConfirm={() => deleteBooking(bookingId, {
                onSettled: () => navigate('/bookings')
              })}
              disabled={isDeleting}
            />
          </Modal.Window>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check In
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isLoading}
            >
              Check Out
            </Button>
          )}

          <Button type="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
