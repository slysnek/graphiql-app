import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Typography } from '@mui/material';

import Form from '../Form/Form';

function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrormessage] = useState('');

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      return;
    }
    if (user) {
      setIsLoading(false);
      dispatch(
        setUser({
          email: user && user.email ? user.email : '',
          token: user ? user.refreshToken : '',
          id: user ? user.uid : '',
          name: '',
        })
      );
      navigate('/welcome', { replace: true });
      return;
    }
    if (!user) {
      setIsLoading(false);
      dispatch(exitUser());
    }
  }, [loading, user]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log(user, error, loading);
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
      console.log('data logIn', data);
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) console.log('error with login from login component', e.message);
      setErrormessage('Failed LogIn. Please, correct your input data!');
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
        minHeight: '500',
      }}
    >
      <Box sx={{ m: 'auto' }}>
        <Typography variant="h6" component="h2" color="steelblue">
          Log In form
        </Typography>
      </Box>
      {isLoading && (
        <Box className="loader">
          <p>Loading...</p>
        </Box>
      )}
      <Form typeForm="login" onclickSubmit={handleLogin} />
      {errorMessage && (
        <Box className="error-box">
          <p>Error at LogIn Page...{errorMessage}</p>
        </Box>
      )}
    </Box>
  );
}

export default LogIn;
