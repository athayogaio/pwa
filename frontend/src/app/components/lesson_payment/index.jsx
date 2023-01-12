/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Grid,
  Typography,
  Switch,
  TextField,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Divider,
} from '@mui/material';

const PaymentMethod = ({
  update, changeDonation, payment, cost,
}) => (
  <>
    <Grid item sx={{ height: '6%' }}>
      <FormControl fullWidth sx={{ paddingLeft: '2%' }}>
        <RadioGroup
          row
          aria-labelledby="lesson-cost-label"
          name="lesson-cost-radio-buttons-group"
          defaultValue="paid"
          sx={{ columnGap: '5%' }}
        >
          <FormControlLabel
            onChange={update}
            value="paid"
            name="payment"
            control={<Radio />}
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Платно</Typography>}
          />
          <FormControlLabel
            onChange={update}
            name="payment"
            value="free"
            control={<Radio />}
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Бесплатно</Typography>}
            sx={{ marginRight: '1%' }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <FormControlLabel
            label={<Typography variant="modal" sx={{ fontSize: '16px', color: '#212121' }}>Принимать чаевые</Typography>}
            sx={{ marginLeft: '2%' }}
            control={(
              <Switch
                defaultChecked
                onChange={changeDonation}
                name="donation"
              />
                )}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
    <Grid item>
      <TextField
        id="lesson_cost"
        label="Стоимость, руб"
        name="cost"
        type="number"
        onChange={update}
        required={payment !== 'free'}
        disabled={payment === 'free'}
        value={payment === 'free' ? '' : cost}
        sx={{ width: '35%' }}
      />
    </Grid>
  </>
);

export default PaymentMethod;
