import React, { useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import InfoChange from './info-change';
import InfoDisplay from './info-display';
import FooterSupport from '../footer-support';

const BillingInfo = () => {
  const [isFilledInfo, setIsFilledInfo] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    isIndividual: true,
    recipient: '',
    acc: '',
    inn: '',
    bic: '',
  });

  const fillInfo = (value, obj, isIndividual) => {
    setIsFilledInfo(value);
    setBillingInfo({ ...obj, isIndividual, status: 'accept' });
  };
  console.log(isFilledInfo);

  return (
    <Box sx={{
      height: { xs: 'calc(100vh - 104px - 56px)', sm: 'calc(100vh - 104px)' },
      maxWidth: '732px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
      <Box>
        <Typography sx={{ fontSize: '18px', fontWeight: '500', mb: '24px' }}>
          Платежная информация
        </Typography>
        {isFilledInfo
          ? (
            <InfoDisplay
              individual={billingInfo.isIndividual}
              recipient={billingInfo.recipient}
              acc={billingInfo.acc}
              inn={billingInfo.inn}
              bic={billingInfo.bic}
              status={billingInfo.status}
              fillInfo={fillInfo}
            />
          )
          : (
            <InfoChange
              fillInfo={fillInfo}
              isIndividual={billingInfo.isIndividual}
              recipient={billingInfo.recipient}
              acc={billingInfo.acc}
              inn={billingInfo.inn}
              bic={billingInfo.bic}
            />
          )}
      </Box>
      <Box>
        <FooterSupport />
      </Box>
    </Box>
  );
};

export default BillingInfo;
