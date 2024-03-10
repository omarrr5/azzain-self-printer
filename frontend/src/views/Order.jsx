import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation'
import logo from '../assets/logo.png'
import deleteBTn from '../assets/trash.png';
import cancelBtn from '../assets/cancel.png';
import next from '../assets/next.png';
import Modal from '../Modal';

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
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
      <div className="Cart-Items">
      <div className="image-box" onClick={() => handleImageClick(logo)}>
        <img src={logo} style={{ height: "100px" }} alt="item" />
      </div>
      <div className="about">
        <h1 className="item-title">Document 1.pdf</h1>
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
      </div>    </div>
    </div>
 
    <div className="Cart-Items">
      <div className="image-box">
        <img src={logo} style={{ height: "100px" }} alt="item" />
      </div>
      <div className="about">
        <h1 className="item-title">Document 2.pdf</h1>
      </div>
      <div className="counter">
      <div className="btn">-</div>
      <div className="count">2</div>
      <div className="btn">+</div>
     </div>
     <div className="prices">
      <div className="amount">RM 0.15</div>
      <div className="remove">
        <img src={deleteBTn} alt="delete button" />
      </div>    </div>  
      </div>

      <div className="Cart-Items">
      <div className="image-box">
        <img src={logo} style={{ height: "100px" }} alt="item" />
      </div>
      <div className="about">
        <h1 className="item-title">Document 2.pdf</h1>
      </div>
      <div className="counter">
      <div className="btn">-</div>
      <div className="count">2</div>
      <div className="btn">+</div>
     </div>
     <div className="prices">
      <div className="amount">RM 0.15</div>
      <div className="remove">
        <img src={deleteBTn} alt="delete button" />
      </div>
    </div>  
      </div>


      <div className="Cart-Items">
      <div className="image-box">
        <img src={logo} style={{ height: "100px" }} alt="item" />
      </div>
      <div className="about">
        <h1 className="item-title">Document 2.pdf</h1>
      </div>
      <div className="counter">
      <div className="btn">-</div>
      <div className="count">2</div>
      <div className="btn">+</div>
     </div>
     <div className="prices">
      <div className="amount">RM 0.15</div>
      <div className="remove">
        <img src={deleteBTn} alt="delete button" />
      </div>
      </div>  
      </div>
      </div>

      {showModal && (
        <Modal closeModal={handleCloseModal} imageUrl={selectedImage} />
      )}

      <div className='options-container'>
    <div className='label-select-container'>
    <label htmlFor="color-option">Color option</label>
      <select id="color-option" name="color-option">
        <option value="bw">Black and White</option>
        <option value="color">Color</option>
      </select>

      <label htmlFor="color-option">Orientaion</label>
      <select id="orientaion-option" name="orientaion-option">
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
  )
}

export default Order
