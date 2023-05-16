import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import LogIn from '../../components/LogIn/LogIn';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t, i18n } = useTranslation()
  return (
    <Container component="main" maxWidth="xl" className="margin-sticky">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          mt: '60px',
          textAlign: 'center',
          width: '60%',
        }}
      >
        <LogIn />
        <Box sx={{ fontWeight: '500', fontSize: '1.2rem', width: '100%', mt: '20px' }}>
          <Typography variant="h6" component="p">
          {t('loginPage.haveNoAcc')} <Link to="/register">{t('loginPage.register')}</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
