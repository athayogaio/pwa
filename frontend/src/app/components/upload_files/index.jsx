/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import './upload.css';
import uploadDocument from '../../../assets/public/uploadDocument.png';

let i = 0;

const UploadFiles = ({ loaderName }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isAddFile, setIsAddFile] = useState(true);
  const [fileName, setFileName] = useState({});
  const [file, setFile] = useState({});
  console.log(file);
  const inputRef = useRef(null);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsAddFile(false);
      setFileName(e.dataTransfer.files[0].name);
      console.log(e.dataTransfer.files);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsAddFile(false);
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const styleDragActive = dragActive ? 'drag-active' : '';
  const inputId = `input-file-${ }`;

  return (
    <form className="form-file-upload" onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
      <input id={inputId} className="input-file-upload" ref={inputRef} type="file" multiple onChange={handleChange} accept="image/jpeg, image/jpg, image/png" />
      <label className={`label-file-upload ${styleDragActive} `} htmlFor={inputId}>
        <Box width="373px" display="flex" flexDirection="row" gap="12px">
          <img src={uploadDocument} alt="upload-document" />
          {isAddFile
            ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontSize="12px" fontWeight="400" color="primary" textAlign="center">
                  Нажмите, чтобы загрузить
                  <Typography variant="title" color="inherit">
                  &nbsp;
                  </Typography>
                  <Typography component="span" fontSize="12px" fontWeight="400" color="#ADB5BD">
                    или перетащите файл сюда jpg, pdf, png (макс. 3mb)
                  </Typography>
                </Typography>
              </Box>
            )
            : (
              <Typography display="flex" alignItems="center">{fileName}</Typography>
            )}
        </Box>
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} /> }
    </form>
  );
};

export default UploadFiles;
