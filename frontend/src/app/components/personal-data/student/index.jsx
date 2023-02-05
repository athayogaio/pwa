import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Avatar, Button, Grid, TextField, FormControl, RadioGroup, Radio,
  FormControlLabel, InputAdornment, Stack,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const PersonDataStudent = () => {
  const fontStyle = {
    '& .MuiTypography-root': {
      fontSize: '16px',
    },
  };

  const [imageBack, setImageBack] = useState(null);
  const [srcBack, setSrcBack] = useState('');

  const [imageAvatar, setImageAvatar] = useState(null);
  const [srcAvatar, setSrcAvatar] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  // Дописать значения, когда будет готов бэк
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    date_of_birth: 'null',
    gender: '',
    about_me: '',
  });

  const handleChangeAnswer = prop => event => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
  };

  const handleChangeDate = newValue => {
    setUserInfo({ ...userInfo, date_of_birth: newValue });
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

  return (
    <Box sx={{
      height: '100%', maxWidth: '952px', width: '100%', pt: '40px',
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Box>
          {srcBack
            ? (
              <Box
                height="223px"
                sx={{
                  backgroundImage: `url(${srcBack})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '223px',
                  mb: '8px',
                }}
                alt="img-back"
              />
            )
            : (
              <Box sx={{ backgroundColor: '#EEEEEE', height: '223px', mb: '8px' }} />
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
                mt: { xs: '-37px', md: '0' },
                mr: { xs: '12px', md: '0' },
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
                  width: '124px',
                  height: '124px',
                  marginTop: '-122px',
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
                  marginTop: { md: '-122px', xs: '-61px' },
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
              id="name"
              label="Имя"
              onChange={handleChangeAnswer('name')}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              id="surname"
              label="Фамилия"
              onChange={handleChangeAnswer('surname')}
            />
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item md={4.5} sm={12} xs={12}>
              <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
                <Stack>
                  <DesktopDatePicker
                    label="День рождения"
                    inputFormat="DD.MM.YYYY"
                    value={userInfo.date_of_birth}
                    onChange={handleChangeDate}
                    renderInput={params => <TextField {...params} error={false} />}
                    components={{
                      OpenPickerIcon: DateRangeIcon,
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item md={5.8} sm={12} xs={12} sx={{ mt: '7px' }}>
              <FormControl sx={{ width: '250px' }}>
                <RadioGroup row onChange={handleChangeAnswer('gender')}>
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Мужчина"
                    sx={{ ...fontStyle, mr: '32px', ml: '0' }}
                  />
                  <FormControlLabel
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
              id="about-me"
              rows={4}
              onChange={handleChangeAnswer('about_me')}
            />
          </Grid>
          <Grid item md sm xs>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
              <Button
                size="large"
                variant="text"
                sx={{
                  color: '#D32F2F', p: '4px 5px', width: { xs: '100%', sm: '160px' }, mb: '16px',
                }}
              >
                удалить аккаунт
              </Button>
              <Button
                size="large"
                variant="contained"
                sx={{
                  p: '6px 16px', fontSize: '14px', width: { xs: '100%', sm: '120px' }, mb: '16px',
                }}
                onClick={() => setIsSaved(true)}
              >
                сохранить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      { isSaved && (
      <Box sx={{
        width: '292px',
        height: '48px',
        position: 'fixed',
        right: '16px',
        top: '80px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2E7D32',
      }}
      >
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#2E7D32' }} />
        <Typography sx={{ fontWeight: '500' }}>
          Ваши данные сохранены
        </Typography>
        <CloseIcon fontSize="small" sx={{ mt: '-8px', cursor: 'pointer' }} onClick={() => setIsSaved(false)} />
      </Box>
      )}
    </Box>
  );
};

export default PersonDataStudent;
