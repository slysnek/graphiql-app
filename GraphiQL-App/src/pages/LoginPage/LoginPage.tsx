import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import LogIn from '../../components/LogIn/LogIn';
import { useTranslation } from 'react-i18next';
import './LoginPage.css';

function LoginPage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth={false} component="main" className="margin-sticky forms__bg">
      <Box className="login__page">
        <LogIn />
        <Box
          sx={{ fontWeight: '500', fontSize: '1.2rem', width: '90%', mt: '0.7rem', mb: '0.7rem' }}
        >
          <Typography variant="h6" component="p">
            {t('loginPage.haveNoAcc')} <Link to="/register">{t('loginPage.register')}</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
