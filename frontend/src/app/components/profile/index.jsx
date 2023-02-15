/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Button, Grid, CardActions,
  Dialog, Box, Card, CardContent, CardMedia,
  Typography,
  Avatar, Button, Grid, CardActions,
  Dialog, Box, Card, CardContent, CardMedia,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import getProfileDataSlice from '../../core/slices/profile/getProfileData';
import defaultBackground from '../../../assets/public/defaultBackground.png';
import defaultAvatar from '../../../assets/public/menu-avatar.png';
import AchievementModal from './achievementModal';
import mockData from '../achievement/mockData';
import EmptyDescription from './emptyDescription';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import getProfileDataSlice from '../../core/slices/profile/getProfileData';
import defaultBackground from '../../../assets/public/defaultBackground.png';
import defaultAvatar from '../../../assets/public/menu-avatar.png';
import AchievementModal from './achievementModal';
import mockData from '../achievement/mockData';
import EmptyDescription from './emptyDescription';
import './index.scoped.scss';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState({});
  const [openAllDesctiption, setOpenAllDesctiption] = useState(false);

  const handleOpenAllDesctiption = () => setOpenAllDesctiption(true);
  const handleCloseAllDesctiption = () => setOpenAllDesctiption(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const mockDataForSM = mockData.slice(0, 4);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  const data = useSelector(state => state.profileData.profileData);

  useEffect(() => {
    dispatch(getProfileDataSlice())
      .then(content => setProfileData(content.payload.data));
  }, []);

  const {
    about, avatar, first_name, last_name, username, background,
  } = profileData;
  const [profileData, setProfileData] = useState({});
  const [openAllDesctiption, setOpenAllDesctiption] = useState(false);

  const handleOpenAllDesctiption = () => setOpenAllDesctiption(true);
  const handleCloseAllDesctiption = () => setOpenAllDesctiption(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');
  const mockDataForSM = mockData.slice(0, 4);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  const data = useSelector(state => state.profileData.profileData);

  useEffect(() => {
    dispatch(getProfileDataSlice())
      .then(content => setProfileData(content.payload.data));
  }, []);

  const {
    about, avatar, first_name, last_name, username, background,
  } = profileData;

  return (
    <Grid container sx={{ padding: pointForAdaptiveToSM ? '0' : '0px 10%', height: '100vh' }}>
      <Grid item sx={{ width: '100%' }}>
        <Card
          variant="outlined"
        >
          {!background ? (
            <CardMedia
              component="img"
              height="168"
              image={defaultBackground}
              alt="user's background"
            />
          ) : (
            <CardMedia
              component="img"
              height="168"
              image={background}
              alt="user's background"
            />
          )}
          <CardContent sx={{ height: '100%' }}>
            <Grid item container sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={defaultAvatar && avatar}
                sx={{
                  width: 128, height: 128, marginTop: '-80px', marginBottom: '12px',
                }}
              />
              <Typography variant="iter_h1" sx={{ paddingBottom: '3px', display: 'block' }}>
                {first_name || 'Имя'}
                {' '}
                {last_name || 'Фамилия'}
              </Typography>
              <Typography
                variant="iter_h2"
                sx={{ paddingBottom: '20px', color: '#6C757D', display: 'block' }}
              >
                @
                {username || 'username'}
              </Typography>
            </Grid>
            <Grid item>
              {!about ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><EmptyDescription /></Box>
                : (
                  <>
                    <Typography
                      variant="iter_h2"
                      paragraph
                      my="16px"
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {about}
                    </Typography>

                    <div>
                      <Button
                        variant="text"
                        size="small"
                        sx={{ textTransform: 'none', left: 'calc(100% - 90px)', position: 'relative' }}
                        onClick={handleOpenAllDesctiption}
                      >
                        Показать ещё
                      </Button>
                      <Dialog
                        open={openAllDesctiption}
                        onClose={handleCloseAllDesctiption}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{ minWidth: '300px', minHeight: '100px' }}
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                          <Typography variant="iter_h1" sx={{ padding: '0 50px 3px 7px', display: 'block' }}>
                            Описание
                          </Typography>
                          <IconButton
                            aria-label="close"
                            onClick={handleCloseAllDesctiption}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: theme => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          <Typography
                            variant="iter_h2"
                          >
                            {about}
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAllDesctiption}>
                            Закрыть
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </>
                )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {!about ? ''
        : (
          <Grid item sx={{ width: '100%' }}>
            <Card>
              <CardContent>
                <Typography variant="iter_h1" sx={{ fontSize: '16px' }}>
                  Достижения
                </Typography>
                {' '}
                <Typography
                  variant="iter_h2"
                  sx={{ color: '#6C757D', fontSize: '16px' }}
                >
                  (8/30)
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  {pointForAdaptiveToSM
                    ? mockDataForSM.map(achiev => (
                      <AchievementModal
                        key={achiev.id}
                        title={achiev.title}
                        description={achiev.description}
                      />
                    ))
                    : mockData.map(achiev => (
                      <AchievementModal
                        key={achiev.id}
                        title={achiev.title}
                        description={achiev.description}
                      />
                    ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', left: 'calc(100% - 113px)' }}
                  onClick={() => navigate('/achievements')}
                >
                  Показать больше
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}

    </Grid>
  );
};

export default ProfileCard;
