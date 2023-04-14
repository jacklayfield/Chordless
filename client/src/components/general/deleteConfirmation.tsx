import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DPROPS {
  showModal: boolean;
  hideModal: Function;
  confirmModal: Function;
  message: String;
}

export const DeleteConfirmation: React.FC<DPROPS> = ({
  showModal,
  hideModal,
  confirmModal,
  message,
}) => {
  return (
    <Modal show={showModal} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={() => hideModal()}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
