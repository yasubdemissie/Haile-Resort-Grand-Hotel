import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import Button from "../ui/Button";
import CabinTable from "../features/cabins/CabinTable";
// import { useState } from "react";
// import CreateCabin from "../features/cabins/CreateCabinForm";
// import Modal from "../ui/Modal";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <AddCabin />
    </>
  );
}

export default Cabins;
