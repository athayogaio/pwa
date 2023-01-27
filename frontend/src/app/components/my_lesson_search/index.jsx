import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Divider, Grid, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import ticketSearch from '../../../assets/public/ticketSearch.svg';

const MyLessonSearch = () => (
  <div style={{
    padding: '20px 24px 20px 20px',
    borderRadius: '16px',
    width: '480px',
    height: '205px',
    marginRight: '24px',
    marginBottom: '24px',
    background: `center / contain no-repeat url(${ticketSearch})`,
  }}
  >
    <Stack
      direction="row"
      spacing={2}
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
      <Grid container direction="column" gap="12px" alignItems="center" justifyContent="space-between" />
    </Stack>
  </div>
);

export default MyLessonSearch;
