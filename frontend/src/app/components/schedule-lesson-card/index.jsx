/* eslint-disable linebreak-style */
import React from 'react';
import {Badge, Box, Divider, Grid, Stack, Typography,} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from 'react-router-dom';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Header from '../header';

const ScheduleLessonCard = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Header title="Календарь" />
    <Box width="800px" m="16px" sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography sx={{ textAlign: 'center', p: '32px 16px 33px 20px', fontSize: '18px' }}>
            ВС
          </Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" sx={{ borderRight: '1px solid #0D6EFD' }} flexItem />
        <Grid item xs container>
          <Grid item xs container direction="column" sx={{ p: '16px' }}>
            <Grid item>
              <Typography sx={{ fontSize: '18px', mb: '8px' }}>
                Пранаяма
              </Typography>
            </Grid>
            <Grid item display="flex">
              <Typography color="text.secondary" mr="16px">
                <DateRangeOutlinedIcon fontSize="20" color="primary" sx={{ mr: '6px', verticalAlign: '-2px' }} />
                26.11
              </Typography>
              <Typography color="text.secondary">
                <AccessTimeOutlinedIcon fontSize="20" color="primary" sx={{ mr: '6px', verticalAlign: '-2px' }} />
                14:00 - 15:30
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default ScheduleLessonCard;
