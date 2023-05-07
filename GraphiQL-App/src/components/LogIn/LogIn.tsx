import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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

      return;
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
            isLogged: true,
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
    <div>
      <h2>Log In form</h2>
      {isLoading && <p>Loading...</p>}
      <Form typeForm="login" onclickSubmit={handleLogin} />
      {isError && <p>Error in Sign Up...{`${error}`}</p>}
    </div>
  );
}

export default LogIn;
