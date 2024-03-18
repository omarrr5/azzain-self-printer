import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const PDFViewer = ({ documentFileName }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get(`/pdf/${documentFileName}`, {
      responseType: 'blob',
    })
    .then(response => {
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
      setError(error);
    });
  }, [documentFileName]);

  const handleContextMenu = event => {
    event.preventDefault(); 
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {pdfUrl && (
        <iframe
        src={pdfUrl + "#toolbar=0"}
        height="600px"
        width= "100%"
        onContextMenu={handleContextMenu}
      />
      )}
    </div>
  );
};

export default PDFViewer;
