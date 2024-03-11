import React from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import MultiFileUpload from '../components/MultiFileUpload';

const Upload = () => {
  return (
    <div className="upload-container">
      <BackgroundAnimation />
      <div className="upload-content">
      <MultiFileUpload className="multi-file-upload" />
      </div>
    </div>
  );
};

export default Upload;
