import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    try {
      const result = await uploadData({
        
        path: `${selectedFile.name}`,
        data: selectedFile,
        options: {
          onProgress: (progress) => {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          }
        }
      }).result;
      console.log(result)
      setUploadStatus(`File uploaded successfully`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
