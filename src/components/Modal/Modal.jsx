import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MsgModal = ({ isShowing, hide, text }) => {
    return(
        isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
              <Modal isOpen={isShowing} fade={false} toggle={hide} backdrop={false}>
                <ModalHeader toggle={hide}>Szelvény törlése</ModalHeader>
                <ModalBody>
                  <p>{text}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary">Igen</Button>{" "}
                  <Button color="secondary" onClick={hide}>
                    Nem
                  </Button>
                </ModalFooter>
              </Modal>
            </React.Fragment>,
            document.body
          )
        : null
    )    
}
  
export default MsgModal;
