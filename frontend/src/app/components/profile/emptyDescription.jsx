import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import TeacherStatus from '../../components/teacher_status';
import statusModeration from '../../../assets/public/status_moderation.png';
import statusAccept from '../../../assets/public/status_accept.png';
import statusReject from '../../../assets/public/status_reject.png';

const emptyDescription = () => {
    return (
        <Box sx={{
            maxHeight: '565px', maxWidth: '377px', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
          >
            <Box
              sx={{
                mb: '32px',
                backgroundImage: `url(${url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                width: '100%',
                height: '448px',
                minHeight: '234px',
                maxHeight: '40vh',
              }}
              alt="status-teacher"
            />
            <Typography variant="h4" sx={{ textAlign: 'center', fontSize: '18px', mb: '16px' }}>
              {applicationStatus}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                maxWidth: '370px', textAlign: 'center', fontSize: '14px', lineHeight: '20px', mb: '24px',
              }}
            >
              {description}
            </Typography>
            {buttonText && (
            <Button
              fullWidth
              component={Link}
              to={buttonLink}
              sx={{
                maxWidth: '347px', borderRadius: '6px', fontSize: '16px', lineHeight: '26px', textAlign: 'center',
              }}
              variant="contained"
              size="large"
            >
              {buttonText}
            </Button>
            )}
          </Box>
    )
}