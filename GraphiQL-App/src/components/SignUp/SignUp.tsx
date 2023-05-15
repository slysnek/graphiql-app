import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser } from '../../store/slices/userSlice';
import { auth, registerWithEmailAndPassword } from '../../helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Form from '../Form/Form';
import { Grid, Typography } from '@mui/material';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      setErrorMessage('');
      return;
    }
    if (user) {
      setIsLoading(false);
      setErrorMessage('');
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
  }, [loading, user]);

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
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
        console.log(e.message);
        setErrorMessage(e.message);
      }
      {
        setErrorMessage('Failed sign Up. Please check input data.');
        console.log('error with sign up from signUp component');
      }
    }
  };

  return (
    <Grid container item xs={12} direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h5" component="h2" color="steelblue">
          Sign Up Form
        </Typography>
      </Grid>
      {isLoading && (
        <Grid item>
          <p>Loading...</p>
        </Grid>
      )}
      <Form typeForm="signUp" onclickLogIn={handleSignUp} />
      {errorMessage && (
        <Grid item>
          <p>Error in Sign Up...{errorMessage}</p>
        </Grid>
      )}
    </Grid>
  );
}

export default SignUp;
