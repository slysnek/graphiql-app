import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Box, Typography } from '@mui/material';

import Form from '../Form/Form';
import { useTranslation } from 'react-i18next';

function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await logInWithEmailAndPassword(email, password);
      if (data && data.user && data.user.email) {
        dispatch(
          setUser({
            email: data.user.email,
            token: data.user.refreshToken,
            id: data.user.uid,
            name: '',
          })
        );
        setIsLoading(false);
        navigate('/welcome', { replace: true });
      }
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrorMessage(`Failed LogIn. ${e.message}`);
      }
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        minHeight: '400px',
      }}
    >
      <Box sx={{ m: 'auto', mt: '40px', mb: '2rem' }}>
        <Typography variant="h6" component="h2" color="steelblue">
          {t('loginForm.header')}
        </Typography>
      </Box>
      {isLoading && (
        <Box className="loader">
          <p>{t('loginForm.loading')}</p>
        </Box>
      )}
      <Form typeForm="login" onclickSubmit={handleLogin} />
      {errorMessage && (
        <Box className="error-box">
          <p>{t('loginForm.error')}{errorMessage}</p>
        </Box>
      )}
    </Box>
  );
}

export default LogIn;
