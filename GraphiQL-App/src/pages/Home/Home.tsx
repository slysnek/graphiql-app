import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser } from '../../store/slices/userSlice';

function Home() {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) dispatch(exitUser());
  }, [user]);
  const isUserLogged = useAppSelector((state) => state.userAuth.email);

  if (isUserLogged) {
    return <div>This is a home page</div>;
  }
  return <Navigate to="/login" replace />;
}

export default Home;
