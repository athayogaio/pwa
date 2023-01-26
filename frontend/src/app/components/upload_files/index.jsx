/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import './upload.css';
import uploadDocument from '../../../assets/public/uploadDocument.png';
import photoUploaded from '../../../assets/public/photo_uploaded.png';
import photoUploadedDelete from '../../../assets/public/photo_uploaded_delete.png';

const UploadFiles = ({ updatePhoto, loaderName, updateCertificate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isAddFile, setIsAddFile] = useState(true);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [fileName, setFileName] = useState([]);

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
      setIsFileLoaded(true);

      if (loaderName === 'certificate_photos') {
        updateCertificate([...e.dataTransfer.files]);
        setFileName([...fileName, ...e.dataTransfer.files]);
      } else {
        setIsAddFile(false);
        updatePhoto(e.dataTransfer.files[0], loaderName);
        setFileName([...fileName, e.dataTransfer.files[0]]);
      }
    }
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsFileLoaded(true);

      if (loaderName === 'certificate_photos') {
        setFileName([...fileName, ...e.target.files]);
        updateCertificate([...e.target.files]);
      } else {
        setIsAddFile(false);
        updatePhoto(e.target.files[0], loaderName);
        setFileName([...fileName, e.target.files[0]]);
      }
    }
  };

  const styleDragActive = dragActive ? 'drag-active' : '';

  const deleteFile = nameFile => {
    if (loaderName === 'certificate_photos') {
      setFileName(
        fileName.filter(el => el.name !== nameFile),
      );
    } else {
      setFileName([]);
      setIsAddFile(true);
      setIsFileLoaded(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {isAddFile
        && (
          <form className="form-file-upload" onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
            <input id={loaderName} className="input-file-upload" ref={inputRef} type="file" multiple onChange={handleChange} accept="image/jpeg, image/jpg, image/png" />
            <label className={`label-file-upload ${styleDragActive} `} htmlFor={loaderName}>
              <Box sx={{
                width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', py: '24px',
              }}
              >
                <img className="image-file-upload" src={uploadDocument} alt="upload-document" />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center' }} color="primary">
                    Нажмите, чтобы загрузить
                    <Typography variant="title" color="inherit">
                &nbsp;
                    </Typography>
                    <Typography component="span" sx={{ fontSize: '16px', fontWeight: '400' }} color="text.secondary">
                      или перетащите файл сюда
                    </Typography>
                  </Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: '400', textAlign: 'center' }} color="#9E9E9E">
                    jpg, pdf, png (макс. 3mb)
                  </Typography>
                </Box>
              </Box>
            </label>
            { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} /> }
          </form>
        )}
      { isFileLoaded
        && (
        <Box sx={{
          width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '24px', rowGap: '8px',
        }}
        >
          {fileName.map(file => (
            <Box key={file.name} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{
                width: '220px', height: '100px', display: 'flex', flexDirection: 'row', mb: '8px',
              }}
              >
                <Box sx={{ background: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px', p: '26px 66px' }}>
                  <img src={photoUploaded} alt="uploaded" style={{ width: '48px', height: '48px' }} />
                </Box>
                <Box
                  sx={{ width: '14px', height: '14px', m: '13px' }}
                  onClick={() => deleteFile(file.name)}
                >
                  <img
                    src={photoUploadedDelete}
                    alt="uploaded-delete"
                  />
                </Box>
              </Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>{file.name}</Typography>
            </Box>
          ))}
        </Box>
        )}
    </Box>
  );
};

export default UploadFiles;
