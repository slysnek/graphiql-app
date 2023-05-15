import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.userAuth.name);

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(exitUser());
        navigate('/login', { replace: true });
      }
      if (user) {
        dispatch(
          setUser({
            email: user && user.email ? user.email : '',
            token: user ? user.refreshToken : '',
            id: user ? user.uid : '',
            name: name,
          })
        );
      }
    });

    return () => {
      listenAuth();
    };
  }, []);

  return <div className="margin-sticky">This is a home page</div>;
}

export default Home;
