import React from "react";
import ReactDom from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import "./Modal.css";

const Modal = ({
  title,
  renderContent = () => {},
  renderAction = () => {},
  show,
  onCloseModal,
  cssBody,
}) => {
  if (!show) {
    return null;
  }
  return ReactDom.createPortal(
    <div
      className="modal"
      onClick={(event) => {
        event.stopPropagation();
        onCloseModal();
      }}
    >
      <div
        className="modal__body"
        onClick={(event) => event.stopPropagation()}
        style={{ ...cssBody }}
      >
        <div className="modal__title">
          {title || "Modal"}
          <button onClick={() => onCloseModal()}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal__content">{renderContent()}</div>
        <div className="modal__action">{renderAction()}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
