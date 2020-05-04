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
            className="button-grid-card btn btn-danger"
            onClick={props.footer.dangerButtonFunction}
          >
            {props.footer.dangerButtonLabel}
          </button>
          <button
            name="btn-confirm"
            className="button-grid-card btn btn-success"
            onClick={props.footer.successButtonFunction}
          >
            {props.footer.successButtonLabel}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default PersonalModal;
