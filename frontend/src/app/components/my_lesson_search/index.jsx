import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import ticketSearch from '../../../assets/public/ticketSearch.svg';

const MyLessonSearch = () => (
  <Box sx={{
    padding: '30px 20px',
    borderRadius: '16px',
    width: { xs: '343px', md: '480px' },
    height: { xs: '170px', md: '210px' },
    mr: { xs: '0', md: '24px' },
    mb: { xs: '0px', md: '24px' },
    background: `center / contain no-repeat url(${ticketSearch})`,
  }}
  >
    <Stack
      direction="row"
      sx={{ height: '100%' }}
    >
      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" sx={{ width: '218%', height: '100%' }}>
        <Link to="/search-lessons">
          <SearchIcon color="disabled" sx={{ width: '45px', height: '45px' }} />
        </Link>
        <Typography variant="body2" sx={{ fontWeight: '500' }}>
          Найти занятие
        </Typography>
      </Stack>
      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />
      <Grid
        container
        direction="column"
        gap="12px"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          ml: { xs: '3px', md: '8px' },
        }}
      />
    </Stack>
  </Box>
);

export default MyLessonSearch;
