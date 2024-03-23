import React from 'react';
import PDFViewer from './components/PDFViewer';

const Modal = ({ closeModal, documentFileName }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <PDFViewer documentFileName={documentFileName}  />
      </div>
    </div>
  );
};

export default Modal;
