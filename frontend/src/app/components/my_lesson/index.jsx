import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, Divider, Grid, Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ellipse from '../../../assets/public/ellipse.png';

const MyLesson = ({ title }) => (
  <Card sx={{
    p: '20px 24px 20px 20px',
    borderRadius: '16px',
    boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
    border: '1px solid #BDBDBD',
    position: 'relative',
    width: '480px',
    marginRight: '24px',
    marginBottom: '24px',

  }}
  >
    <Link to="/">
      <MoreHorizOutlinedIcon color="disabled" sx={{ position: 'absolute', top: '5px', right: '10px' }} />
    </Link>
    <Stack
      direction="row"
      spacing={2}
    >
      <Grid container direction="column" gap="16px">
        <div>
          <Typography
            variant="h6"
            noWrap="true"
            paragraph
            sx={{
              fontSize: '18px', maxWidth: '271px', mb: '0',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            noWrap="true"
            paragraph
            sx={{
              fontSize: '18px', maxWidth: '271px', mb: '0',
            }}
          >
            по курсу Евгения Романова ещё какой-то текст чтобы добить 100ку символов
          </Typography>
        </div>
        <Grid item xs container direction="column">
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '13px', mb: '7px' }}>
            Ближайшее занятие:
          </Typography>
          <Grid item xs container>
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
        <Grid item xs container gap="6px" alignItems="center">
          <Avatar alt="name" src="avatar" />
          <Typography variant="body1">
            Виктор Васильев
          </Typography>
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed', position: 'relative' }} />
      <img src={ellipse} alt="" style={{ position: 'absolute', bottom: '0px' }} />
      <Grid container direction="column" gap="12px" alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: '500', textAlign: 'center' }}>
            Осталось посещений:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" color="primary">
            1
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={1} alignItems="center">
          <Typography variant="body2">
            Дата окончания:
          </Typography>
          <Typography color="primary" variant="body2" sx={{ fontWeight: '500' }}>
            31.12.2022 23:59
          </Typography>

        </Grid>
      </Grid>
    </Stack>
  </Card>
);

export default MyLesson;
