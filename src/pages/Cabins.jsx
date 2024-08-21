import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabin from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShow((show) => !show)}>Add Cabin</Button>
      {show && <CreateCabin />}
    </>
  );
}

export default Cabins;
