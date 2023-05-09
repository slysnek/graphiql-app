import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser } from '../../store/slices/userSlice';

function WelcomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) dispatch(exitUser());
    // navigate('/login', { replace: true });
  }, [user]);

  const isUserLogged = useAppSelector((state) => {
    return state.userAuth.email;
  });

  if (isUserLogged) {
    const userName = useAppSelector((state) => {
      return state.userAuth.name;
    });
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
