/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import './upload.css';
import uploadDocument from '../../../assets/public/uploadDocument.png';

const DragDropFile = () => {
  const [dragActive, setDragActive] = useState(false);

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
      console.log('Перетаскивание файла');
      console.log(e.dataTransfer.files);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log('Выбор файла вручную');
      console.log(e.target.files);
    }
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple onChange={handleChange} accept="image/jpeg, image/jpg, image/png" />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>
        <Box width="373px" display="flex" flexDirection="row" gap="12px">
          <img src={uploadDocument} alt="upload-document" />
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
        </Box>
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} /> }
    </form>
  );
};

export default DragDropFile;
