import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../helpers/firebase';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser } from '../../store/slices/userSlice';

function Home() {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const isUserLogged = useAppSelector((state) => state.userAuth.email);

  useEffect(() => {
    if (!isUserLogged) navigate('/login', { replace: true });
  });
  useEffect(() => {
    if (!user) dispatch(exitUser());
  }, [user]);

  return <div className="margin-sticky">This is a home page</div>;
  // className margin-sticky is required for sticky header - write it for parent element at Home
}

export default Home;
