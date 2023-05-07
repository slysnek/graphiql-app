import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooksRedux';
import { setUser } from '../../store/slices/userSlice';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Form from '../Form/Form';

function LogIn() {
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await logInWithEmailAndPassword(email, password);
      console.log('data logIn', data);
    } catch (e) {
      console.log('error with login from login component');
    }
  };

  // useEffect(()=>{
  // 	if(loading) return;
  // 	if(user)
  // });

  return (
    <div>
      <h2>Log In form</h2>
      <Form typeForm="login" onclickSubmit={handleLogin} />
    </div>
  );
}

export default LogIn;
