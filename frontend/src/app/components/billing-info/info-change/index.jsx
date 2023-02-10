import React, { useState } from 'react';
import {
  Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Grid, TextField, Button,
} from '@mui/material';

const InfoChange = ({ individual, recipient, acc, inn, bic, fillInfo }) => {
  const [billingInfo, setBillingInfo] = useState({
    recipient,
    acc,
    inn,
    bic,
  });

  const [isIndividual, setIsIndividual] = useState(individual);

  const handleChange = inputName => e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setBillingInfo({ ...billingInfo, [inputName]: e.target.value });
    }
  };

  const handleChangeInfo = prop => event => {
    setBillingInfo({ ...billingInfo, [prop]: event.target.value });
  };

  const postBillingInfo = () => {
    fillInfo(true, billingInfo, isIndividual);
  };

  return (
    <>
      <Typography color="text.secondary" sx={{ fontSize: '14px', display: { xs: 'none', sm: 'block' }, mb: '32px' }}>
        Данная информация используется в системе для перевода денежных средств
        за проведённые занятия преподавателям. В случае её отсутствия, оплата
        за проведенные занятия будет невозможна.
      </Typography>
      <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={3} mb="56px">
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              defaultValue="individual"
              onChange={() => setIsIndividual(!isIndividual)}
              sx={{ flexDirection: { xs: 'column', sm: 'row' }, '& .MuiTypography-root': { fontSize: '16px' } }}
            >
              <FormControlLabel
                value="individual"
                control={<Radio />}
                label="Физическое лицо"
              />
              <FormControlLabel
                value="legal"
                control={<Radio />}
                label="Юридическое лицо"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="receiver"
            label="Получатель"
            helperText={isIndividual ? 'ФИО' : 'ИП, компания'}
            inputProps={{ style: { textTransform: 'uppercase' } }}
            onChange={handleChangeInfo('recipient')}
            value={billingInfo.recipient}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="inn"
            label="ИНН"
            helperText="Если ИНН нет, напишите «0»"
            type="text"
            onChange={handleChange('inn')}
            value={billingInfo.inn}
            inputProps={{
              maxLength: 10,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="acc"
            label="Счет"
            helperText="Счет - 20 цифр. Если в нем содежится 22 цифры, напишите первые 20"
            type="text"
            onChange={handleChange('acc')}
            value={billingInfo.acc}
            inputProps={{
              maxLength: 20,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="bic"
            label="БИК"
            helperText="БИК - 9 цифр"
            type="text"
            onChange={handleChange('bic')}
            value={billingInfo.bic}
            inputProps={{
              maxLength: 9,
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '32px' }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ maxWidth: { xs: '100%', sm: '228px' }, fontSize: '16px' }}
          onClick={postBillingInfo}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
};

export default InfoChange;
