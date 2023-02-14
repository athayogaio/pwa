import React from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import mockData from './mockData';
import AchievementCard from '../achievement-card';
import LayoutContainer from '../layout-container';
import Header from '../header/index';

const AchievementsPage = () => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: pointForAdaptiveToSM ? 'flex-start' : 'center',
        }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', width: '50%', paddingBottom: '24px',
          }}
          >
            <Typography fontWeight="500" fontSize="18px" sx={{ display: 'inline', paddingRight: '3px' }}>
              Достижения
            </Typography>
            <Typography sx={{
              fontWeight: '500', fontSize: '18px', color: '#0D6EFD', display: 'inline',
            }}
            >
              (8/30)
            </Typography>
          </Box>
          <Grid
            container
            rowGap="10px"
            sx={{ width: pointForAdaptiveToSM ? '100%' : '50%' }}
          >
            {mockData.map(achievement => (
              <AchievementCard
                title={achievement.title}
                description={achievement.description}
                progress={achievement.progress}
                key={achievement.id}
              />
            ))}
          </Grid>
        </Box>
      </LayoutContainer>
    </>
  );
};

export default AchievementsPage;
