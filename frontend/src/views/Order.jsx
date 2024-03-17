import React, { useState, useEffect } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Modal from '../Modal';
import axiosClient from '../axios-client';
import logo from '../assets/logo.png';
import deleteBTn from '../assets/trash.png';
import cancelBtn from '../assets/cancel.png';
import next from '../assets/next.png';
import PDFViewer from '../components/PDFViewer';

const Order = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosClient.get('/uploaded-documents')
      .then(response => {
        setUploadedDocuments(response.data.documents);
      })
      .catch(error => {
        console.error('Error fetching uploaded documents:', error);
      });
  }, []);

  const handleDocumentClick = (documentUrl) => {
    setSelectedDocumentUrl(documentUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDocumentUrl(null);
    setShowModal(false);
  };



  return (
    <div>
      <BackgroundAnimation/>
      <div className="Cart-Container">
        <div className="cart">
          <div className='Header'>
            <h3>Your Documents</h3>
            <button className='Action'><img src={cancelBtn} alt="cancel button" /></button>
          </div>
          {uploadedDocuments.map((document, index) => (
            <div key={index} className="Cart-Items">
              <div className="image-box" onClick={() => handleDocumentClick(document.url)}>
                <img  style={{ height: "100px" }} alt="item" />
              </div>
              <div className="about">
                <h1 className="item-title">{document.name}</h1>
              </div>
              <div className="counter">
                <div className="btn">-</div>
                <div className="count">2</div>
                <div className="btn">+</div>
              </div>
              <div className="prices">
                <div className="amount">RM 0.15</div>
                <div className="remove">
                  <button><img src={deleteBTn} alt="delete button" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <Modal closeModal={handleCloseModal}>
            <PDFViewer documentUrl={selectedDocumentUrl} />
          </Modal>
        )}

        <div className='options-container'>
          <div className='label-select-container'>
            <label htmlFor="color-option">Color option</label>
            <select id="color-option" name="color-option">
              <option value="bw">Black and White</option>
              <option value="color">Color</option>
            </select>

            <label htmlFor="color-option">Orientation</label>
            <select id="orientation-option" name="orientation-option">
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>

            <label htmlFor="duplex-option">Printing mode</label>
            <select id="printing-mode" name="printing-mode">
              <option value="single">Single side</option>
              <option value="duplex">Double side</option>
            </select>
          </div>
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">2 items</div>
              </div>
              <div className="total-amount">RM 6.18</div>
            </div>
            <button className="checkout-button">
              <img src={next} alt="checkout button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
