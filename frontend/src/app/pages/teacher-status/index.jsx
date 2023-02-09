import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/header';
import LayoutContainer from '../../components/layout-container';
import TeacherStatus from '../../components/teacher_status';
import statusModeration from '../../../assets/public/status_moderation.png';
import statusAccept from '../../../assets/public/status_accept.png';
import statusReject from '../../../assets/public/status_reject.png';

const TeacherStatusPage = () => {
  const reason = 'причина, указанная модератором';

  const moderation = {
    url: `${statusModeration}`,
    application_status: 'Анкета отправлена на проверку',
    description: 'Мы отправим письмо на Вашу электронную почту с информацией о результате проверки.',
    button_text: false,
    button_link: '',
  };

  const accept = {
    url: `${statusAccept}`,
    application_status: 'Вы преподаватель команды ATHAYOGA',
    description: 'Ваша анкета прошла проверку, и Вы можете создавать свои занятия',
    button_text: 'Создать занятие',
    button_link: '/create-lesson',
  };

  const reject = {
    url: `${statusReject}`,
    application_status: 'Ваша заявка отклонена',
    description: `К сожалению, Ваша заявка отклонена по следующей причине: ${reason}. Вы можете устранить выявленные недочеты и повторно отправить заявку.`,
    button_text: 'Стать преподавателем',
    button_link: '/teacher-form',
  };

  return (
    <>
      <Header withBackBtn />
      <LayoutContainer>
        <Box sx={{
          height: { xs: '78vh', sm: '82vh' }, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <TeacherStatus
            url={moderation.url}
            applicationStatus={moderation.application_status}
            description={moderation.description}
            buttonText={moderation.button_text}
            buttonLink={moderation.button_link}
          />
        </Box>
      </LayoutContainer>
    </>
  );
};

export default TeacherStatusPage;
