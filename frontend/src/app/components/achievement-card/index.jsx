/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const AchievementCard = ({
  image, title, description, progress, endPoint,
}) => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{
      width: '100%',
      height: '113px',
      background: '#FFFFFF',
      boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.08)',
      borderRadius: '8px',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <Grid
        container
        flexDirection="row"
        alignItems="center"
        spacing={{
          xs: 0, sm: 1, md: 2, lg: 2,
        }}
      >

        <Grid item xs={1.5} sm={3} md={3} lg={2.5} sx={{ minWidth: pointForAdaptiveToSM ? '48px' : '72px' }}>
          <img src={image} alt={title} style={{ width: pointForAdaptiveToSM ? '48px' : '72px', height: pointForAdaptiveToSM ? '48px' : '72px' }} />
        </Grid>

        <Grid container item sx={{ flexDirection: 'column' }} xs={9.5} sm={5} md={7} lg={8.5}>
          <Typography fontWeight="500" fontSize="18px" sx={{ pb: '5px ' }}>
            {title}
          </Typography>
          <Divider variant="horizontal" sx={{ borderRight: '1px solid #0D6EFD', width: '100%' }} flexItem />
          <Typography fontWeight="400" fontSize="16px" sx={{ pt: '5px', color: 'text.secondary' }}>
            {description}
          </Typography>
        </Grid>

        <Grid item xs={1} sm={1} md lg={1} sx={{ pl: '10px' }}>
          <Typography sx={{ fontWeight: '500', fontSize: '16px', color: '#0D6EFD' }}>
            {progress}
            /
            {endPoint}
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
};

export default AchievementCard;
