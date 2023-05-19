import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../helpers/firebase';
import { signInWithGoogle } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Box, Typography, Snackbar, Alert } from '@mui/material';

import Form from '../Form/Form';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [, , error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { t } = useTranslation();

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
        setSuccessMessage(t('loginForm.successStillLogged').toString());
        setIsLoading(false);
        setTimeout(() => {
          navigate('/welcome', { replace: true });
        }, 1700);
      }
      dispatch(exitUser());
      setIsLoading(false);
      setSuccessMessage('');
      setErrorMessage('');
    });
    console.log('called LogInUseEffect');
    return () => {
      listenAuth();
    };
  }, [dispatch, navigate, t]);

  useEffect(() => {
    if (!error) {
      setErrorMessage('');
      return;
    }
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
        setSuccessMessage(t('loginForm.successMessage').toString());
        setErrorMessage('');
        setTimeout(() => {
          navigate('/welcome', { replace: true });
        }, 1700);
      }
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrorMessage(`${e.message}`);
      } else {
        setErrorMessage(t('loginForm.undefinedError').toString());
      }
    }
  };

  const logInGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setErrorMessage('');
      setSuccessMessage(t('loginForm.successMessage').toString());
      setIsLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(t('loginForm.errorGoogle').toString());
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
      {isLoading && <LoadingSpinner loading={isLoading} />}
      <Form typeForm="login" onclickSubmit={handleLogin} onGoogleHandler={logInGoogle} />

      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          onClose={() => {
            setErrorMessage('');
          }}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setErrorMessage('');
            }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          onClose={() => {
            setSuccessMessage('');
          }}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            variant="filled"
            severity="success"
            onClose={() => {
              setSuccessMessage('');
            }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default LogIn;
