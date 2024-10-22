import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

import styled from "styled-components";
import propTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, createLoad } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: "duplicate",
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt="sp" />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount === 0 ? "_" : `${discount}` }</Discount>
        <Modal>
          <Menus>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                duplicate
              </Menus.Button>

              <Modal.Open name="editCabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open name="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
            <Modal.Window name="editCabin">
              <CreateCabinForm cabin={cabin} name="editCabin" />
            </Modal.Window>
          </Menus>
        </Modal>
      </Table.Row>
    </>
  );
}

CabinRow.propTypes = {
  cabin: propTypes.object,
};

export default CabinRow;
