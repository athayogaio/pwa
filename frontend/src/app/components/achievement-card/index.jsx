/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import image from '../../../assets/public/achievement.svg';

const AchievementCard = ({
  title, description, progress,
}) => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  return (
    <Grid item sx={{ width: '100%' }}>
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
        <Grid container item alignItems="center" flexDirection="row" flexWrap="nowrap" sx={{ width: '90%' }}>
          <img src={image} alt={title} style={{ paddingRight: '10px', width: pointForAdaptiveToSM ? '48px' : '72px', height: pointForAdaptiveToSM ? '48px' : '72px' }} />
          <Grid container item sx={{ flexDirection: 'column' }}>
            <Typography fontWeight="500" fontSize="18px" sx={{ pb: '5px ' }}>
              {title}
            </Typography>
            <Divider variant="horizontal" sx={{ borderRight: '1px solid #0D6EFD', width: '100%' }} flexItem />
            <Typography fontWeight="400" fontSize="16px" sx={{ pt: '5px', color: 'text.secondary' }}>
              {description}
            </Typography>
          </Grid>

          <Grid item sx={{ pl: '10px', width: '10%' }}>
            <Typography sx={{ fontWeight: '500', fontSize: '16px', color: '#0D6EFD' }}>
              {progress}
              /1
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Grid>
  );
};

export default AchievementCard;
