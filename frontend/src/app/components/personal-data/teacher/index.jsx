import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Avatar, Button, Grid, TextField, FormControl, RadioGroup, Radio,
  FormControlLabel, InputAdornment, Checkbox,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const PersonDataTeacher = () => {
  const fontStyle = {
    '& .MuiTypography-root': {
      fontSize: '16px',
    },
  };

  const userDataLocal = (JSON.parse(localStorage.getItem('user'))).user;

  const [imageBack, setImageBack] = useState(null);
  const [srcBack, setSrcBack] = useState('');

  const [imageAvatar, setImageAvatar] = useState(null);
  const [srcAvatar, setSrcAvatar] = useState('');

  const [checked, setChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Дописать значения, когда будет готов бэк
  const [userInfo, setUserInfo] = useState({
    about_me: '',
    data_is_hidden: checked,
  });

  const handleChange = event => {
    setChecked(event.target.checked);
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

  return (
    <Box sx={{
      height: '100%', maxWidth: '952px', width: '100%', py: '40px',
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Typography color="text.secondary">
          Обязательные поля *
        </Typography>
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
              required
              disabled
              id="name"
              label="Имя"
              defaultValue={userDataLocal.first_name}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              required
              disabled
              id="surname"
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
                    checked={checked}
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
              id="about-me"
              rows={4}
              onChange={handleChangeAnswer('about_me')}
            />
          </Grid>
          <Grid item md sm xs>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size="large"
                variant="text"
                sx={{ color: '#D32F2F', p: '4px 5px' }}
              >
                удалить аккаунт
              </Button>
              <Button
                size="large"
                variant="contained"
                sx={{ p: '6px 16px', fontSize: '14px' }}
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

export default PersonDataTeacher;
