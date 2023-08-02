import { Link } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import Grid from '@mui/material/Grid/Grid';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './SignUpPage.css';

function SignUpPage() {
  const { t } = useTranslation();
  return (
    <Grid
      sx={{
        display: 'flex',
        flexFirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
      }}
      component="main"
      className="margin-sticky forms__bg"
      container
    >
      <SignUp />
      <Grid
        className="forms-change__link"
        item
        xs={10}
        lg={11}
        sx={{ fontWeight: '500', fontSize: '1.2rem', mt: '0.7rem' }}
      >
        <Typography variant="h6" component="p" sx={{ mb: '70px' }}>
          {t('signUpPage.haveAnAcc')} <Link to="/login">{t('signUpPage.login')}</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
