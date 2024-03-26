import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import docxLogo from '../assets/docx-logo.png'; 

const PDFViewer = ({ documentFileName }) => {
  const [fileType, setFileType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get(`/pdf/${documentFileName}`, { responseType: 'blob' })
      .then(response => {
        const contentType = response.headers['content-type'];
        setFileType(contentType);
        const fileBlob = new Blob([response.data], { type: contentType });
        const url = URL.createObjectURL(fileBlob);
        setFileUrl(url);
      })  
      .catch(error => {
        console.error('Error fetching file:', error);
        setError(error);
      });
  }, [documentFileName]);

  const handleContextMenu = event => {
    event.preventDefault(); 
  };

  const handleDownload = event => {
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      event.preventDefault();
      console.log('Automatic download disabled for DOCX files');
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {fileType.startsWith('image/') ? ( 
        <img src={fileUrl} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <div>
          {fileType === 'application/pdf' ? (
            <iframe
              src={`${fileUrl}#toolbar=0`}
              width="100%"
              height="600px"
              title="PDF Viewer"
              frameBorder="0"
              onContextMenu={handleContextMenu}
              onLoad={handleDownload} 
            />
          ) : (
            <div>
              <img src={docxLogo} alt="DOCX File"height="400px"/>
              <p>DOCX files cannot be displayed.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
