import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser, exitUser } from '../../store/slices/userSlice';
import { auth, registerWithEmailAndPassword } from '../../helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithGoogle } from '../../helpers/firebase';
import Form from '../Form/Form';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Alert, Snackbar } from '@mui/material';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [, , error] = useAuthState(auth);
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
        setSuccessMessage(t('loginForm.successStillLogged') as string);
        setIsLoading(false);
        navigate('/welcome', { replace: true });
      } else {
        dispatch(exitUser());
        setSuccessMessage('');
        setIsLoading(false);
        setErrorMessage('');
      }
    });
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
        setSuccessMessage(t('loginForm.successMessage') as string);
        setErrorMessage('');
        setTimeout(() => {
          navigate('/welcome', { replace: true });
        }, 1700);
      }
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(t('loginForm.errorRegister') as string);
      }
    }
  };

  const signUpGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setErrorMessage('');
      setSuccessMessage(t('loginForm.successMessage') as string);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(t('loginForm.errorGoogle') as string);
      }
    }
  };

  return (
    <Grid
      container
      item
      xs={10}
      sm={7}
      md={5}
      lg={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5" component="h2" color="steelblue" sx={{ mt: '40px' }}>
          {t('loginForm.create')}
        </Typography>
      </Grid>
      {isLoading ? <LoadingSpinner loading={isLoading} /> : ''}
      <Form typeForm="signUp" onclickLogIn={handleSignUp} onGoogleHandler={signUpGoogle} />
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          onClose={() => {
            setErrorMessage('');
          }}
          autoHideDuration={5000}
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
    </Grid>
  );
}

export default SignUp;
