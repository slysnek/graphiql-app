import { Link } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import Grid from '@mui/material/Grid/Grid';
import { useTranslation } from 'react-i18next';

import './SignUpPage.css';

function SignUpPage() {
  const { t } = useTranslation();
  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
        sx={{ fontWeight: '500', fontSize: '1.2rem', mt: '0.7rem', mb: '0.7rem' }}
      >
        <p>
          {t('signUpPage.haveAnAcc')} <Link to="/login">{t('signUpPage.login')}</Link>
        </p>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
