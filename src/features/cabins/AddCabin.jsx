import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  // const [show, setShow] = useState(false);

  return (
    <div>
      <Modal>
        <Modal.Open name="cabin-form">
          <Button>Create Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
    // <div>
    //   <Button onClick={() => setShow((show) => !show)}>Add Cabin</Button>
    //   {show && (
    //     <Modal closeModal={() => setShow(false)}>
    //       <CreateCabinForm closeModal={() => setShow(false)} type="modal"/>
    //     </Modal>
    //   )}
    // </div>
  );
}

export default AddCabin;
