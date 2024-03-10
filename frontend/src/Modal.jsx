import React from 'react';

const Modal = ({ closeModal, imageUrl }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <img src={imageUrl} alt="Selected Image" />
      </div>
    </div>
  );
};

export default Modal;
