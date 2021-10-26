import { useState } from "react";
//import Alert from "react-bootstrap/Alert";
//import { Modal, Button } from "react-bootstrap";

const GotWinner = (step, params) => {
  const [modal, setModal] = useState(true);
  const resetGame = () => {
    setModal(false);
    document.location.reload();
  };
  return (
    <div></div>
    // <Modal show={modal} onHide={() => {}}>
    //   <Modal.Header>
    //     <Modal.Title>Победитли ${step}</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body></Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="primary" onClick={() => resetGame()}>
    //       Играть заново
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default GotWinner;
