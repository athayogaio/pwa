import React from 'react';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LayoutContainer = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      sx={matches ? {
        overflow: 'auto', maxHeight: 'calc(100% - 64px)', minWidth: '100%', padding: '20px',
      } : {
        overflow: 'auto', maxHeight: 'calc(100% - 56px)', minWidth: '100%', padding: '20px',
      }}
    >
      {children}
    </Container>
  );
};

export default LayoutContainer;
