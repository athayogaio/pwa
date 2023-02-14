import React, { useState } from 'react';
import {
  Typography, Stack, Card, Input,
} from '@mui/material';

const Price = ({
  el, price, setAmount, amount,
}) => {
  const [quantity, setQuantity] = useState(12);

  const handleSelect = () => {
    el.num ? setAmount(el.num) : setAmount(quantity);
  };

  const handleChange = e => {
    setQuantity(e.target.value);
    setAmount(e.target.value);
  };

  const DISCOUNT_TABLE = [
    {
      minAmount: 4,
      maxAmount: 8,
      discount: 5,
    },
    {
      minAmount: 8,
      maxAmount: 12,
      discount: 10,
    },
    {
      minAmount: 12,
      maxAmount: 16,
      discount: 15,
    },
    {
      minAmount: 16,
      maxAmount: 100,
      discount: 20,
    },
  ];

  const calculateAmountWithDiscount = (num, quantity, price) => {
    const sum = num || quantity;

    if (sum < 4) return sum * price;

    const { discount } = DISCOUNT_TABLE.find(item => sum >= item.minAmount && sum < item.maxAmount);
    const sumWithDiscount = Math.ceil(sum * price * ((100 - discount) / 100));
    return sumWithDiscount;
  };

  return (
    <Card
      onClick={handleSelect}
      key={el.id}
      sx={{
        p: '27px 50px',
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
        width: '479px',
        height: '130px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      style={amount === el.num || amount === quantity && el.num === 0 ? { border: '2px solid #0D6EFD' } : {}}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        {!el.num ? (
          <Input
            value={quantity}
            autoFocus
            onChange={handleChange}
            sx={{
              fontSize: '32px',
              fontWeight: '500',
              maxWidth: '37px',
            }}
          />
        )
          : (
            <Typography fontSize="24px" fontWeight="500">
              {`${el.num} ${el.str}`}
            </Typography>
          )}

        {el.num > 3 || !el.num && quantity > 3 ? ( // скидка - двойное поле
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography color="text.secondary" fontSize="24px" fontWeight="400" sx={{ textDecoration: 'line-through' }}>
              {`${el.num * price || quantity * price} ₽`}
            </Typography>
            <Typography color="primary" fontSize="32px" fontWeight="700">
              {`${calculateAmountWithDiscount(el.num, quantity, price)} ₽`}
            </Typography>
          </Stack>
        ) : ( // без скидок
          <Typography color="primary" fontSize="32px" fontWeight="700">
            {`${el.num * price || quantity * price} ₽`}
          </Typography>
        )}

      </Stack>
    </Card>
  );
};
export default Price;
