import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card, Divider, Grid, Menu, MenuItem, Modal, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ticket from '../../../assets/public/ticket.svg';

const MyLesson = ({
  title, ticketsAmount, endDate, isOneTime, id,
}) => {
  const prepareEndDate = date => `${date.split('T')[0].split('-').reverse().join('.')} ${date.split('T')[1].slice(0, 5)}`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    handleMenuClose();
    setOpenModal(true);
  };
  const deleteTicket = () => {
    handleCloseModal();
  };
  const styleModal = {
    position: 'absolute',
    display: 'flex',
    gap: '34px',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 616,
    bgcolor: '#FAFAFA',
    border: 'none',
    boxShadow: '0px 10px 20px rgba(16, 50, 80, 0.12)',
    p: 3,
    '&:focus': {
      outline: 'none',
    },
  };
  return (
    <Box sx={{
      width: { xs: '343px', md: '480px' },
      height: { xs: '170px', md: '210px' },
      padding: { xs: '27px 7px 20px 12px', md: '30px 5px 30px 20px' },
      borderRadius: '16px',
      mr: { xs: '0', md: '24px' },
      mb: { xs: '0px', md: '24px' },
      background: `center / contain no-repeat url(${ticket})`,
      filter: 'drop-shadow(0px 8px 16px rgba(46, 60, 80, .08))',
      // outline: '1px solid red',
    }}
    >
      <MoreHorizOutlinedIcon
        color="disabled"
        sx={{ position: 'absolute', top: { xs: '17px', md: '10px' }, right: { xs: '12px', md: '20px' } }}
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleMenuClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenModal} sx={{ fontSize: '16px', minWidth: '220px' }}>
          <DeleteOutlinedIcon sx={{ marginRight: '19px' }} />
          {'   '}
          В архив

        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight="600">
              Переместить занятие в архив
            </Typography>
            <CloseIcon sx={{ width: '24px', height: '24px', color: '#616161' }} onClick={handleCloseModal} />
          </Stack>
          <Typography id="modal-modal-description" fontSize="16px">
            Вы действительно хотите переместить занятие в архив?
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button variant="text" sx={{ fontSize: '14px' }} onClick={handleCloseModal}>отмена</Button>
            <Button variant="text" sx={{ fontSize: '14px' }} color="error" onClick={deleteTicket}>переместить</Button>
          </Stack>
        </Box>
      </Modal>
      <Stack
        direction="row"
      >
        <Grid container direction="column" gap={{ xs: '10px', md: '16px' }} width="205%">
          <Box>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: { xs: '16px', md: '18px' },
                maxWidth: '271px',
                height: { xs: '22px', md: '38px' },
                mb: '0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Grid container direction="column">
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '12px', md: '13px' }, mb: '4px' }}>
              Ближайшее занятие:
            </Typography>
            <Grid container>
              <DateRangeOutlinedIcon
                color="primary"
                sx={{ transform: 'translateY(-2px)', mr: '6px', width: '16px' }}
              />
              <Typography variant="body1" sx={{ mr: '13px', fontSize: { xs: '12px', md: '14px' } }}>
                Пн, 26 дек
              </Typography>
              <AccessTimeIcon
                color="primary"
                sx={{ transform: 'translateY(-2px)', mr: '6px', width: '16px' }}
              />
              <Typography variant="body1" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                14:00 - 15:30
              </Typography>
            </Grid>
          </Grid>
          <Grid container gap="6px" alignItems="center">
            <Avatar alt="name" src="avatar" sx={{ width: { xs: '24px', md: '32px' }, height: { xs: '24px', md: '32px' } }} />
            <Typography variant="body1" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
              Виктор Васильев
            </Typography>
          </Grid>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderStyle: 'dashed', position: 'relative', height: { xs: '110px', md: '150px' }, top: { xs: '7px', md: 'auto' },
          }}
        />

        <Grid container direction="column" gap="6px" alignItems="center" justifyContent="center" sx={{ ml: { xs: '4px', md: '14px' } }}>
          {isOneTime && (
            <>
              <Grid item>
                <LocalLibraryOutlinedIcon color="primary" fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}>
                  Разовое занятие
                </Typography>
              </Grid>
            </>
          )}
          {!isOneTime && (
          <>

            {ticketsAmount > 0 && (
            <>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}>
                  Осталось посещений:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" color="primary" sx={{ fontSize: { xs: '25px', md: '29px' } }}>
                  {ticketsAmount}
                </Typography>
              </Grid>
              <Grid container direction="column" spacing={1} alignItems="center" sx={{ mt: '4px' }}>
                <Typography variant="body2" sx={{ textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}>
                  Дата окончания:
                </Typography>
                <Typography color="primary" variant="body2" sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}>
                  {prepareEndDate(endDate)}
                </Typography>
              </Grid>
            </>
            )}
            {!ticketsAmount && (
            <>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}>
                  Посещения закончились
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/abonement/${id}`}
                  sx={{ width: { xs: '95px', md: '110px' } }}
                >
                  приобрести
                </Button>
              </Grid>
            </>
            )}
          </>

          )}
        </Grid>
      </Stack>
    </Box>
  );
};

export default MyLesson;
