import React from "react";
import "../styles/modal.scss";
import PropTypes from "prop-types";
import {AiOutlineCloseCircle} from 'react-icons/ai';

const Modal = ({ onClose, show, children }) => {

  const closeModal = e => {
    onClose && onClose(e);
  };
  if (!show) {
    return null;
  }
  return (
    <div className="modal" id="modal">
      <div className="body">
        <div className="header">
            <AiOutlineCloseCircle className="close" onClick={closeModal}/>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;