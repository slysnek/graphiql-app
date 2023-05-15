import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../helpers/firebase';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';

function Home() {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    if (!user) {
      dispatch(exitUser());
      navigate('/login', { replace: true });
    }
    dispatch(
      setUser({
        email: user && user.email ? user.email : '',
        id: user && user.uid ? user.uid : '',
        token: user && user.refreshToken ? user.refreshToken : '',
        name: '',
      })
    );
    console.log('data-', data);
    console.log('user-', user);
  }, [user]);

  return <div className="margin-sticky">This is a home page</div>;
  // className margin-sticky is required for sticky header - write it for parent element at Home
}

export default Home;
