import { Navigate, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser } from '../../store/slices/userSlice';

function WelcomePage() {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) dispatch(exitUser());
  }, [user]);
  const isUserLogged = useAppSelector((state) => state.userAuth.isLogged);

  if (isUserLogged) {
    const userName = useAppSelector((state) => state.userAuth.name);
    console.log(userName);
    return (
      <div>
        <p>Hello from welcomePage {userName}</p>
        <p>Here will be some info about authors</p>
        <button type="button">
          <NavLink to="/home">Start QL</NavLink>
        </button>
      </div>
    );
  }
  return <Navigate to="/login" replace />;
}

export default WelcomePage;
