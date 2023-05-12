import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setName, UserState } from '../../store/slices/userSlice';

function WelcomePage() {
  const dispatch = useAppDispatch();

  const [user] = useAuthState(auth);
  const initialData = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    if (!user) dispatch(exitUser());
    setUserName(initialData);
  }, [user]);

  async function setUserName(info: UserState) {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      dispatch(
        setName({
          ...info,
          name: data.name,
        })
      );
    } catch (err) {
      dispatch(
        setName({
          ...info,
          name: '',
        })
      );
    }
  }

  const userName = useAppSelector((state) => {
    return state.userAuth.name;
  });

  return (
    <div className="margin-sticky" style={{ minHeight: '300px' }}>
      <h3>
        Hello from welcomePage {userName ? <span>{userName}</span> : <span>Unregister user</span>}
      </h3>
      <p>Here will be some info about authors</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero exercitationem
        nulla molestiae quis excepturi. Nam est blanditiis ipsa iusto rem ipsum voluptatem magnam
        eveniet consectetur aliquid beatae, autem similique.
      </p>

      <button type="button">
        <NavLink to="/home">Start QL</NavLink>
      </button>
      {/* button Home only for test - delete after end creating welcome page */}
    </div>
  );
}

export default WelcomePage;
