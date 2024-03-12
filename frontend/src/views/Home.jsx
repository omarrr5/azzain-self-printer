import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import BackgroundAnimation from '../components/BackgroundAnimation';
import QRCode from 'react-qr-code';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    setQRCodeValue(generateQRCodeValue());
  }, []); 

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function generateQRCodeValue() {
    return `https://example.com/${Date.now()}`;
  }



  return (
    <div className="glassmorphism-container">
      <BackgroundAnimation />
      <div className="glassmorphism-effect">
        <div className='logo'>
          <img src={logo} alt="Azzain Ink Logo" />
        </div>
        <div className="wrapper-title">
          <h1 className="title">Welcome to <span>AzzainInk</span></h1>
        </div>
        <div className="wrap">
          <button className="button" onClick={handleButtonClick}>START</button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <QRCode value={qrCodeValue} bgColor="#f5f5f5" fgColor="#00b4ff" />
                <h2>Scan The QR Code To Upload Your Documents</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
