import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Typography, Avatar, Button, Grid, TextField, FormControl, RadioGroup, Radio,
  FormControlLabel, InputAdornment, Checkbox,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import patchPersonalDataSlice from '../../../core/slices/personal-data/patchPersonalData';
import DeleteAccount from '../delete-account/index';
import { setAlertProps } from '../../../core/slices/alert-notification';

const PersonDataTeacher = () => {
  const fontStyle = {
    '& .MuiTypography-root': {
      fontSize: '15px',
    },
  };

  const dispatch = useDispatch();

  const userDataLocal = (JSON.parse(localStorage.getItem('user'))).user;

  const [imageBack, setImageBack] = useState(null);
  const [srcBack, setSrcBack] = useState('');

  const [imageAvatar, setImageAvatar] = useState(null);
  const [srcAvatar, setSrcAvatar] = useState('');

  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    about: '',
    avatar: '',
    background: '',
    hide_birthday: false,
  });

  const handleClickOpen = boolenValue => {
    setOpen(boolenValue);
  };

  const handleChange = event => {
    setUserInfo({ ...userInfo, hide_birthday: event.target.checked });
  };

  const handleChangeAnswer = prop => event => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
  };

  const handleFileBack = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImageBack(e.target.files[0]);
    }
  };

  const handleFileAvatar = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImageAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setSrcBack(reader.result);
    };
    if (imageBack) {
      reader.readAsDataURL(imageBack);
    } else {
      setSrcBack('');
    }
  }, [imageBack]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setSrcAvatar(reader.result);
    };
    if (imageAvatar) {
      reader.readAsDataURL(imageAvatar);
    } else {
      setSrcAvatar('');
    }
  }, [imageAvatar]);

  const handleSubmit = () => {
    dispatch(setAlertProps({
      display: true,
      status: 'success',
      title: 'Ваши данные сохранены',
    }));

    dispatch(patchPersonalDataSlice({
      ...userInfo,
      avatar: imageAvatar,
      background: imageBack,
    }));
  };

  return (
    <Box sx={{
      height: '100%', maxWidth: '952px', width: '100%', py: '12px',
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 500 }}>Личные данные</Typography>
        <Typography color="text.secondary">
          Обязательные поля *
        </Typography>
        <Box>
          {srcBack
            ? (
              <Box
                sx={{
                  backgroundImage: `url(${srcBack})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: { xs: '120px', md: '168px' },
                  borderRadius: '8px 8px 0px 0px',
                }}
                alt="img-back"
              />
            )
            : (
              <Box sx={{
                backgroundColor: '#EEEEEE', height: { xs: '120px', md: '168px' }, borderRadius: '8px 8px 0px 0px',
              }}
              />
            )}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <input type="file" id="fileBack" multiple={false} accept="image/*" style={{ display: 'none' }} onChange={handleFileBack} />
            <Button
              component="label"
              htmlFor="fileBack"
              size="large"
              variant="text"
              sx={{
                p: '4px 5px',
                mt: '0',
                mr: '0',
              }}
            >
              Изменить фон
            </Button>
          </Box>

          {srcAvatar
            ? (
              <Avatar
                sx={{
                  backgroundColor: '#fff',
                  width: { md: '124px', xs: '95px' },
                  height: { md: '124px', xs: '95px' },
                  marginTop: { md: '-120px', xs: '-80px' },
                  mx: 'auto',
                  marginBottom: '8px',
                  border: '2px solid #fff',
                  backgroundImage: `url(${srcAvatar})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <PersonIcon sx={{ display: 'none' }} />
              </Avatar>
            )
            : (
              <Avatar
                sx={{
                  width: { md: '124px', xs: '95px' },
                  height: { md: '124px', xs: '95px' },
                  marginTop: { md: '-120px', xs: '-80px' },
                  mx: 'auto',
                  mb: '8px',
                  border: '2px solid #fff',
                }}
              >
                <PersonIcon sx={{ fontSize: { md: '108px', xs: '83px' } }} />
              </Avatar>
            )}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <input type="file" id="fileAvatar" multiple={false} accept="image/*" style={{ display: 'none' }} onChange={handleFileAvatar} />
            <Button
              component="label"
              htmlFor="fileAvatar"
              size="large"
              variant="text"
              sx={{ p: '4px 7px' }}
            >
              Изменить фото
            </Button>
          </Box>
        </Box>
        <Grid container spacing="24px">
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              disabled
              id="first_name"
              label="Имя"
              defaultValue={userDataLocal.first_name}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              disabled
              id="last_name"
              label="Фамилия"
              defaultValue={userDataLocal.last_name}
            />
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item md={4.5} sm={12} xs={12}>
              <TextField
                fullWidth
                required
                disabled
                id="birthday"
                label="Дата рождения"
                InputProps={{
                  endAdornment:
                      (
                        <InputAdornment position="end">
                          <DateRangeIcon sx={{ color: '#BDBDBD' }} />
                        </InputAdornment>
                      ),
                }}
                sx={{ ...fontStyle }}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={userInfo.hide_birthday}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{ p: '16px' }}
                  />
                )}
                label="Скрыть дату рождения в профиле"
                sx={{
                  ...fontStyle,
                  '& .MuiTypography-root': {
                    width: '265px',
                  },
                }}
              />
            </Grid>
            <Grid item md={5.8} sm={12} xs={12} sx={{ mt: '7px' }}>
              <FormControl sx={{ width: '250px' }}>
                <RadioGroup row defaultValue="MALE">
                  <FormControlLabel
                    disabled
                    value="MALE"
                    control={<Radio />}
                    label="Мужчина"
                    sx={{ ...fontStyle, mr: '32px', ml: '0' }}
                  />
                  <FormControlLabel
                    disabled
                    value="FEMALE"
                    control={<Radio />}
                    label="Женщина"
                    sx={{ ...fontStyle, mr: '0' }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12} sx={{ mb: '32px' }}>
            <TextField
              fullWidth
              multiline
              label="О себе"
              id="about"
              rows={4}
              onChange={handleChangeAnswer('about')}
            />
          </Grid>
          <Grid item md sm xs>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
              <Button
                size="large"
                variant="text"
                color="error"
                sx={{ p: '4px 5px', fontSize: '14px' }}
                onClick={() => handleClickOpen(true)}
              >
                удалить аккаунт
              </Button>
              <Button
                size="large"
                variant="contained"
                sx={{ p: '6px 16px', fontSize: '14px', mb: { xs: '16px', sm: 0 } }}
                onClick={handleSubmit}
              >
                сохранить
              </Button>
            </Box>
          </Grid>
        </Grid>
        {open && <DeleteAccount handleClickOpen={handleClickOpen} />}
      </Box>
    </Box>
  );
};

export default PersonDataTeacher;
