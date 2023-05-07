import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser } from '../../store/slices/userSlice';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Form from '../Form/Form';

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
            isLogged: true,
          })
        );
        navigate('/welcome', { replace: true });
      }
    } catch (e) {
      setIsError(true);
      if (e instanceof Error) console.log(e.message);
      console.log('error with login from login component');
    }
  };

  return (
    <div>
      <h2>Sign Up Form</h2>
      {isLoading && <p>Loading...</p>}
      <Form typeForm="signUp" onclickLogIn={handleSignUp} />
      {isError && <p>Error in Sign Up...{`${error}`}</p>}
    </div>
  );
}

export default SignUp;
