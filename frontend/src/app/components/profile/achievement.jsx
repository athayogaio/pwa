/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import achievement from '../../../assets/public/achievement.svg';

const Achievement = ({
  title, description,
}) => {
  const [openAchieve, setOpenAchieve] = useState(false);

  const handleOpen = () => setOpenAchieve(true);
  const handleClose = () => setOpenAchieve(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <CardMedia
        component="img"
        image={achievement}
        alt="achievement"
        sx={{
          cursor: 'pointer', width: pointForAdaptiveToSM ? '56px' : '82px', height: pointForAdaptiveToSM ? '56px' : '82px', marginTop: '10px',
        }}
        onClick={handleOpen}
      />
      <Dialog
        open={openAchieve}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey[500]',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{ flexDirection: 'column', alignItems: 'center', rowGap: pointForAdaptiveToSM ? '10px' : '20px' }}>
            <CardMedia
              component="img"
              image={achievement}
              alt="achievement"
              sx={{
                cursor: 'pointer', width: pointForAdaptiveToSM ? '56px' : '82px', height: pointForAdaptiveToSM ? '56px' : '82px', marginTop: '10px',
              }}
            />
            <Typography variant="iter_h1" sx={{ fontSize: pointForAdaptiveToSM ? '18px' : '24px' }}>
              {title}
            </Typography>
            <Typography
              variant="iter_h2"
              sx={{
                fontSize: pointForAdaptiveToSM ? '14px' : '16px', display: 'block', width: '300px', textAlign: 'center',
              }}
            >
              {description}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: pointForAdaptiveToSM ? 'center' : 'flex-end' }}>
          <Button onClick={handleClose}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Achievement;
