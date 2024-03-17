import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import trash from '../assets/trash.png';
import fileIcon from '../assets/file.png';
import axiosClient from '../axios-client.js';


const MultiFileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const deleteFile = index => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = size => {
    if (size === 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${parseFloat((size / Math.pow(1024, i)).toFixed(2))} ${units[i]}`;
  };

  const uploadFiles = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files[]", file);
    });

    axiosClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Files uploaded successfully:", response.data);
        setFiles([]);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (    
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <img src={fileIcon} alt="upload File Icon" />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </>
        )}
      </div>
      {files.length > 0 && (
        <div className="file-list">
          <h2>Uploaded Files</h2>
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
              <button className="delete-button" onClick={() => deleteFile(index)}>
                <img src={trash} alt="delete button" />
              </button>
            </div>
          ))}
            <button className="upload-button" onClick={uploadFiles}>
                    Upload Files
            </button>
        </div>
      )}
    </div>
  );
};

export default MultiFileUpload;
