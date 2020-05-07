import React from "react";
import { Modal } from "react-bootstrap";

function PersonalModal(props) {
  return (
    <Modal {...props} backdrop="static">
      {props.title && (
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
      )}
      {props.body && <Modal.Body>{props.body}</Modal.Body>}
      {props.footer && (
        <Modal.Footer>
          <button
            name="btn-cancel"
            className="button-grid-card btn btn-success"
            onClick={props.footer.firstButtonFunction}
          >
            {props.footer.firstButtonLabel}
          </button>
          <button
            name="btn-confirm"
            className="button-grid-card btn btn-success"
            onClick={props.footer.secondButtonFunction}
          >
            {props.footer.secondButtonLabel}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default PersonalModal;
