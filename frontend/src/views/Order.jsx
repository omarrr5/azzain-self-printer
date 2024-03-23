import React, { useState, useEffect } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Modal from '../Modal';
import axiosClient from '../axios-client';
import deleteBtn from '../assets/trash.png';
import cancelBtn from '../assets/cancel.png';
import next from '../assets/next.png';
import logo from '../assets/logo.png';


const Order = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [counts, setCounts] = useState({}); 
  const [products, setProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('bw');
  const [selectedOrientation, setSelectedOrientation] = useState('landscape');
  const [selectedPrintingMode, setSelectedPrintingMode] = useState('single');

  useEffect(() => {
    axiosClient.get('/uploaded-documents')
      .then(response => {
        setUploadedDocuments(response.data.documents);
        const initialCounts = {};
        response.data.documents.forEach(document => {
          initialCounts[document.name] = 1;
        });
        setCounts(initialCounts);
      })
      .catch(error => {
        console.error('Error fetching uploaded documents:', error);
      });

    axiosClient.get('/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
    setShowModal(false);
  };

  const decrementCount = (documentId) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [documentId]: Math.max(prevCounts[documentId] - 1, 1),
    }));
  };

  const incrementCount = (documentId) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [documentId]: prevCounts[documentId] ? prevCounts[documentId] + 1 : 1,
    }));
  };

  const deleteDocument = (documentName) => {
    axiosClient.delete(`/uploaded-documents/${documentName}`)
      .then(() => {
        const updatedDocuments = uploadedDocuments.filter(doc => doc.name !== documentName);
        setUploadedDocuments(updatedDocuments);
        setCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          delete newCounts[documentName];
          return newCounts;
        });
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  };

  const deleteAllDocuments = (callback) => {
    axiosClient.delete('/uploaded-documents')
      .then(() => {
        setUploadedDocuments([]);
        setCounts({});
        if (callback) {
          callback();
        }
      })
      .catch(error => {
        console.error('Error deleting documents:', error);
      });
  };
  

  const handleCancel = () => {
    deleteAllDocuments(() => {
      window.location.href = '/'; 
    });
  };

 
  const getProductPrice = () => {
    console.log('Selected Color:', selectedColor);
    const selectedProduct = products.find(product => product.color.toLowerCase() === selectedColor.toLowerCase());
    if (selectedProduct) {
      return selectedColor.toLowerCase() === 'bw' ? selectedProduct.price : selectedProduct.price;
    }
    return 0;
  };

  const checkout = () => {
    const quantity = Object.values(counts).reduce((acc, count) => acc + count, 0);
    const pricePerPage = getProductPrice(); 
    const totalPrice = quantity * pricePerPage;
  
    const orderDetails = {
      uploaded_documents: 'uploaded Documents',
      selected_color: selectedColor,
      selected_orientation: selectedOrientation,
      selected_printing_mode: selectedPrintingMode,
      quantity: quantity,
      price_per_page: pricePerPage,
      total_price: totalPrice,
      payment_method: 'credit_card', 
      payment_status: 'pending' 
    };
  
    axiosClient.post('/order', orderDetails)
      .then(response => {
        window.location.href = '/print'; 
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error creating order:', error);
      });
  };
  
  
  
  
  return (
    <div>
      <BackgroundAnimation/>
      <div className="Cart-Container">
        <div className="cart">
          <div className='Header'>
            <h3>Your Documents</h3>
            <button className='Action' onClick={handleCancel}><img src={cancelBtn} alt="cancel button" /></button>
          </div>
          {uploadedDocuments.map((document, index) => (
            <div key={index} className="Cart-Items">
              <div className="image-box" onClick={() => handleDocumentClick(document)}>
                <img src={logo} style={{ height: "100px" }} alt="item" />
              </div>
              <div className="about">
                <h1 className="item-title">{document.name}</h1>
              </div>
              <div className="counter">
                <div className="btn" onClick={() => decrementCount(document.name)}>-</div>
                <div className="count">{counts[document.name]}</div>
                <div className="btn" onClick={() => incrementCount(document.name)}>+</div>
              </div>
              <div className="prices">
                <div className="amount">RM {(counts[document.name] * getProductPrice()).toFixed(2)}</div>
                <div className="remove">
                  <button onClick={() => deleteDocument(document.name)}><img src={deleteBtn} alt="delete button" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <Modal closeModal={handleCloseModal} documentFileName={selectedDocument.name} />
        )}

        <div className='options-container'>
          <div className='label-select-container'>
            <label htmlFor="color-option">Color option</label>
            <select id="color-option" name="color-option" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="bw">Black and White</option>
              <option value="color">Color</option>
            </select>

            <label htmlFor="color-option">Orientation</label>
            <select id="orientation-option" name="orientation-option" value={selectedOrientation} onChange={(e) => setSelectedOrientation(e.target.value)}>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>

            <label htmlFor="duplex-option">Printing mode</label>
            <select id="printing-mode" name="printing-mode" value={selectedPrintingMode} onChange={(e) => setSelectedPrintingMode(e.target.value)}>
              <option value="single">Single side</option>
              <option value="duplex">Double side</option>
            </select>
          </div>
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">{uploadedDocuments.length} items</div>
              </div>
              <div className="total-amount">RM {Object.values(counts).reduce((acc, count) => acc + count * getProductPrice(), 0).toFixed(2)}</div>
            </div>
            <button className="checkout-button" onClick={checkout} >
              <img src={next} alt="checkout button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
