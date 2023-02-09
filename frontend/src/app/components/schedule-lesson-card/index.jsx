/* eslint-disable linebreak-style */
import React from 'react';
import {Box, Divider, Grid, Typography} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const ScheduleLessonCard = ({ name, weekday, date, timeInterval }) => (
  <Box maxWidth="100%" width="800px" m="16px" sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography sx={{ textAlign: 'center', p: '32px 16px 33px 20px', fontSize: '18px' }}>
          {weekday}
        </Typography>
      </Grid>
      <Divider orientation="vertical" variant="middle" sx={{ borderRight: '1px solid #0D6EFD' }} flexItem />
      <Grid item xs container>
        <Grid item xs container direction="column" sx={{ p: '16px' }}>
          <Grid item>
            <Typography sx={{ fontSize: '18px', mb: '8px' }}>
              {name}
            </Typography>
          </Grid>
          <Grid item display="flex">
            <Typography color="text.secondary" mr="16px">
              <DateRangeOutlinedIcon fontSize="20" color="primary" sx={{ mr: '6px', verticalAlign: '-2px' }} />
              {date}
            </Typography>
            <Typography color="text.secondary">
              <AccessTimeOutlinedIcon fontSize="20" color="primary" sx={{ mr: '6px', verticalAlign: '-2px' }} />
              {timeInterval}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default ScheduleLessonCard;
