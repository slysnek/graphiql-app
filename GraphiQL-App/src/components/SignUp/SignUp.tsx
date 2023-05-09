import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser } from '../../store/slices/userSlice';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Form from '../Form/Form';
import setUserName from '../../helpers/setUserName';
import Grid from '@mui/material/Grid/Grid';

function SignUp() {
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
      setUserName;
      navigate('/welcome', { replace: true });

      return;
    }
  }, [loading, user]);

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      const data = await registerWithEmailAndPassword(email, password, name);
      if (!(data instanceof Error) && user && user.email) {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: '',
          })
        );
        setUserName;
        navigate('/welcome', { replace: true });
      }
    } catch (e) {
      setIsError(true);
      if (e instanceof Error) console.log(e.message);
      console.log('error with login from login component');
    }
  };

  return (
    <Grid container item xs={12} direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <h2>Sign Up Form</h2>
      </Grid>
      {isLoading && (
        <Grid item>
          <p>Loading...</p>
        </Grid>
      )}
      <Form typeForm="signUp" onclickLogIn={handleSignUp} />
      {isError && (
        <Grid item>
          <p>Error in Sign Up...{`${error}`}</p>
        </Grid>
      )}
    </Grid>
  );
}

export default SignUp;
