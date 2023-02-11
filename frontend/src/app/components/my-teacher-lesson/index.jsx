import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card, Divider, Grid, Menu, MenuItem, Modal, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EmojiFlagsOutlinedIcon from '@mui/icons-material/EmojiFlagsOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ticket from '../../../assets/public/ticket.svg';

const MyTeacherLesson = ({
  title, endDate, id, status,
}) => {
  const prepareEndDate = date => `${date.split('T')[0].split('-').reverse().join('.')} ${date.split('T')[1].slice(0, 5)}`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const isEnded = () => {
    const today = new Date();
    const endTime = new Date(Date.parse(endDate));
    return !((endTime - today));
  };

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
    <Box style={{
      padding: '20px 24px 20px 30px',
      borderRadius: '16px',
      width: '480px',
      marginRight: '24px',
      marginBottom: '24px',
      background: `center / cover no-repeat url(${ticket})`,
      filter: 'drop-shadow(0px 8px 16px rgba(46, 60, 80, .08))',
      // outline: '1px solid red',
    }}
    >
      <MoreHorizOutlinedIcon
        color="disabled"
        sx={{ position: 'absolute', top: '10px', right: '20px' }}
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
          Удалить

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
              Удалить занятие
            </Typography>
            <CloseIcon sx={{ width: '24px', height: '24px', color: '#616161' }} onClick={handleCloseModal} />
          </Stack>
          <Typography id="modal-modal-description" fontSize="16px">
            Вы действительно хотите удалить занятие?
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button variant="text" sx={{ fontSize: '14px' }} onClick={handleCloseModal}>отмена</Button>
            <Button variant="text" sx={{ fontSize: '14px' }} color="error" onClick={deleteTicket}>удалить</Button>
          </Stack>
        </Box>
      </Modal>
      {((status === 'PUBLISHED' && isEnded() === false) || status === 'MODERATION') && (
      <Stack
        direction="row"
        spacing={2}
      >
        <Grid container direction="column" gap="16px" width="207%">
          <Box>
            <Typography
              variant="h6"
              paragraph
              sx={{
                fontSize: '18px',
                maxWidth: '271px',
                height: '43px',
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
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '13px', mb: '7px' }}>
              Ближайшее занятие:
            </Typography>
            <Grid container>
              <DateRangeOutlinedIcon
                color="primary"
                size="small"
                sx={{ transform: 'translateY(-2px)', mr: '6px' }}
              />
              <Typography variant="body1" sx={{ mr: '13px' }}>
                Пн, 26 дек
              </Typography>
              <AccessTimeIcon
                color="primary"
                sx={{ transform: 'translateY(-2px)', mr: '6px' }}
              />
              <Typography variant="body1">
                14:00 - 15:30
              </Typography>
            </Grid>
          </Grid>
          <Grid container gap="6px" alignItems="center">
            <Avatar alt="name" src="avatar" sx={{ width: 32, height: 32 }} />
            <Typography variant="body1">
              Виктор Васильев
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />

        <Grid container direction="column" gap="6px" alignItems="center" justifyContent="space-between">
          {status === 'PUBLISHED' && (
            <>
              <Stack spacing={1} direction="column" alignItems="center">
                <CheckCircleOutlineOutlinedIcon fontSize="large" sx={{ mt: '30px', color: '#4CAF50' }} />

                <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '16px', color: '#4CAF50' }}>
                  Активно
                </Typography>
              </Stack>
              <Grid container direction="column" spacing={1} alignItems="center" sx={{ mt: '4px' }}>
                <Typography variant="body1" color="text.secondary">
                  Дата окончания:
                </Typography>
                <Typography color="primary" variant="body1" sx={{ fontWeight: '500' }}>
                  {prepareEndDate(endDate)}
                </Typography>
              </Grid>
            </>
          )}
          {status === 'MODERATION' && (
          <>
            <Stack spacing={1} direction="column" alignItems="center">
              <AccessTimeIcon color="warning" fontSize="large" sx={{ mt: '30px' }} />
              <Typography variant="body1" sx={{ fontWeight: '500', color: '#ED6C02' }}>
                На проверке
              </Typography>
            </Stack>
            <Grid item>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                По окончании проверки придет уведомление
              </Typography>
            </Grid>
          </>
          )}

        </Grid>
      </Stack>
      )}
      {(status === 'DRAFT' || status === 'CANCELED') && (
        <Stack
          direction="row"
          spacing={2}
        >
          <Grid container direction="column" justifyContent="space-between" width="207%" gap="77px">
            <Box>
              <Typography
                variant="h6"
                color={status === 'CANCELED' ? 'text.disabled' : ''}
                paragraph
                sx={{
                  fontSize: '18px',
                  maxWidth: '271px',
                  height: '43px',
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
            <Grid container gap="6px" alignItems="center">
              <Avatar alt="name" src="avatar" sx={{ width: 32, height: 32 }} />
              <Typography variant="body1" color={status === 'CANCELED' ? 'text.disabled' : ''}>
                Виктор Васильев
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />

          <Grid container direction="column" gap="6px" alignItems="center" justifyContent="space-between">
            {status === 'DRAFT' && (
            <>
              <Stack direction="column" alignItems="center">
                <HistoryEduOutlinedIcon fontSize="large" sx={{ mt: '30px' }} />
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Черновик
                </Typography>
              </Stack>
              <Grid item>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Нажмите для редактирования
                </Typography>
              </Grid>
            </>
            )}
            {status === 'CANCELED' && (
            <>
              <Stack direction="column" alignItems="center">
                <CancelOutlinedIcon color="error" fontSize="large" sx={{ mt: '30px' }} />
                <Typography variant="body1" sx={{ fontWeight: '500' }} color="error">
                  Отменено
                </Typography>
              </Stack>
              <Grid item>
                <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center' }}>
                  Потраченные средства будут возмещены
                </Typography>
              </Grid>
            </>
            )}

          </Grid>
        </Stack>
      )}
      {(status === 'PUBLISHED' && isEnded() === true) && (
        <Stack
          direction="row"
          spacing={2}
        >
          <Grid container direction="column" justifyContent="space-between" width="207%" gap="77px">
            <Box>
              <Typography
                variant="h6"
                color="text.disabled"
                paragraph
                sx={{
                  fontSize: '18px',
                  maxWidth: '271px',
                  height: '43px',
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
            <Grid container gap="6px" alignItems="center">
              <Avatar alt="name" src="avatar" sx={{ width: 32, height: 32 }} />
              <Typography variant="body1" color="text.disabled">
                Виктор Васильев
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />

          <Grid container direction="column" gap="6px" alignItems="center" justifyContent="space-between">
            <Stack direction="column" alignItems="center">
              <EmojiFlagsOutlinedIcon fontSize="large" sx={{ mt: '30px', color: '#616161' }} />
              <Typography variant="body1" sx={{ fontWeight: '500' }} color="text.secondary">
                Завершено
              </Typography>
            </Stack>
            <Grid item>
              <Button
                variant="outlined"
              >
                продлить
              </Button>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Box>
  );
};

export default MyTeacherLesson;