import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box } from '@mui/material';

import Form from '../Form/Form';

function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }
    if (user) {
      setIsLoading(false);
      setIsError(false);
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
      setIsError(true);
      setIsLoading(false);
      dispatch(exitUser());
    }
  }, [loading, user]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await logInWithEmailAndPassword(email, password);
      if (!(data instanceof Error) && user && user.email) {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: '',
          })
        );
        navigate('/welcome', { replace: true });
      }
      console.log('data logIn', data);
    } catch (e) {
      console.log('error with login from login component');
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ m: 'auto' }}>
        <h2>Log In form</h2>
      </Box>
      {isLoading && (
        <Box>
          <p>Loading...</p>
        </Box>
      )}
      <Form typeForm="login" onclickSubmit={handleLogin} />
      {isError && (
        <Box>
          <p>Error in Sign Up...{`${error}`}</p>
        </Box>
      )}
    </Box>
  );
}

export default LogIn;
