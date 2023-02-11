import React from 'react';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const ScheduleLessonCard = ({
  name, weekday, date, timeInterval, disabled,
}) => (
  <Box maxWidth="100%" disabled width="800px" m="16px" sx={{ border: '1px solid #E0E0E0', borderRadius: '8px' }}>
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Typography sx={{
          textAlign: 'center', p: '32px 16px 33px 20px', fontSize: '18px', color: disabled ? '#ADB5BD' : '#212121',
        }}
        >
          {weekday}
        </Typography>
      </Grid>
      <Divider orientation="vertical" variant="middle" sx={{ borderRight: disabled ? '1px solid #BDBDBD' : '1px solid #0D6EFD' }} flexItem />
      <Grid item xs container>
        <Grid item xs container direction="column" sx={{ p: '16px' }}>
          <Grid item>
            <Typography sx={{ fontSize: '18px', mb: '8px', color: disabled ? '#ADB5BD' : '#212121' }}>
              {name}
            </Typography>
          </Grid>
          <Grid item display="flex">
            <Typography mr="16px" sx={{ color: disabled ? '#ADB5BD' : 'text.secondary' }}>
              <DateRangeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: disabled ? '#9E9E9E' : '#0D6EFD' }} />
              {date}
            </Typography>
            <Typography sx={{ color: disabled ? '#ADB5BD' : 'text.secondary' }}>
              <AccessTimeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: disabled ? '#9E9E9E' : '#0D6EFD' }} />
              {timeInterval}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default ScheduleLessonCard;
