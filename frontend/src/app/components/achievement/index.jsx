import React from 'react';
import {
  Box, Grid, Typography,
  AppBar, Stack, Toolbar,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import achievements from './data';
import AchievementCard from '../achievement-card';
import LayoutContainer from '../layout-container';

const Achievement = () => {
  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        sx={{ boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)', backgroundColor: '#fff' }}
      >

        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >

          <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
            <ArrowBackIcon
              fontSize="medium"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(-1);
              }}
            />
            <Typography
              sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: '500', cursor: 'pointer' }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Назад
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <LayoutContainer>
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
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
            {achievements.map(achievement => (
              <Grid item sx={{ width: '100%' }} key={achievement.id}>
                <AchievementCard
                  image={achievement.image}
                  title={achievement.title}
                  description={achievement.description}
                  progress={achievement.progress}
                  endPoint={achievement.endPoint}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </LayoutContainer>
    </>
  );
};

export default Achievement;
