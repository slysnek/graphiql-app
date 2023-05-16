import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser, exitUser } from '../../store/slices/userSlice';
import { auth, registerWithEmailAndPassword } from '../../helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import Form from '../Form/Form';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [, , error] = useAuthState(auth);
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoading(true);
        dispatch(
          setUser({
            email: currentUser && currentUser.email ? currentUser.email : '',
            token: currentUser ? currentUser.refreshToken : '',
            id: currentUser ? currentUser.uid : '',
            name: '',
          })
        );
        setIsLoading(false);
        navigate('/welcome', { replace: true });
      }
      dispatch(exitUser());
      setIsLoading(false);
      setErrorMessage('');
    });

    return () => {
      listenAuth();
    };
  }, []);

  useEffect(() => {
    if (!error) {
      setErrorMessage('');
      return;
    }
    setErrorMessage(error.message);
  }, [error]);

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await registerWithEmailAndPassword(email, password, name);
      if (data && data.email) {
        dispatch(
          setUser({
            email: data.email,
            token: data.refreshToken,
            id: data.uid,
            name: '',
          })
        );
        setIsLoading(false);
        setErrorMessage('');
        navigate('/welcome', { replace: true });
      }
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
      {
        setErrorMessage('Failed login');
      }
    }
  };

  return (
    <Grid container item xs={12} direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h5" component="h2" color="steelblue" sx={{ mt: '40px' }}>
        {t('loginForm.create')}
        </Typography>
      </Grid>
      {isLoading && (
        <Grid item>
          <p>{t('loginForm.loading')}</p>
        </Grid>
      )}
      <Form typeForm="signUp" onclickLogIn={handleSignUp} />
      {errorMessage && (
        <Grid item>
          <p>{t('loginForm.error')}{errorMessage}</p>
        </Grid>
      )}
    </Grid>
  );
}

export default SignUp;
