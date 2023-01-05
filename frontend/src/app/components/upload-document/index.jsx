import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import uploadDocument from '../../../assets/public/uploadDocument.png';

const UploadDocument = () => (
  <Box
    component={Link}
    sx={{ border: '1px dashed #E0E0E0', py: '9px', textDecoration: 'none' }}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box width="373px" display="flex" flexDirection="row" gap="12px">
      <img src={uploadDocument} alt="upload-document" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h4" variant="h4" fontSize="12px" fontWeight="400" color="primary" textAlign="center">
          Нажмите, чтобы загрузить
          <Typography variant="title" color="inherit" noWrap>
            &nbsp;
          </Typography>
          <Typography component="span" fontSize="12px" fontWeight="400" color="#ADB5BD">
            или перетащите файл сюда jpg, pdf, png (макс. 3mb)
          </Typography>
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default UploadDocument;
