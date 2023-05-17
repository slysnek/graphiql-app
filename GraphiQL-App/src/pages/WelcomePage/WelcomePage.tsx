import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../helpers/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setName, UserState } from '../../store/slices/userSlice';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const dispatch = useAppDispatch();

  const [user] = useAuthState(auth);
  const initialData = useAppSelector((state) => state.userAuth);
  const { t, i18n } = useTranslation()

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
        {userName ? (
          <span>{t('welcomePage.greeting')} {userName}!</span>
        ) : (
          <span>{t('welcomePage.requestToLogIn')}</span>
        )}
      </h3>
      <p>//TODO: add description (completed tasks)</p>
      <p>{t('welcomePage.authors')}</p>
      <ul>
        <li>Slysnek</li>
        <p>{t('welcomePage.author_1')}</p>
        <li>Skuzema</li>
        <p>{t('welcomePage.author_2')}</p>
        <li>Sergik</li>
        <p>{t('welcomePage.author_3')}</p>
      </ul>

      <button type="button">
        <NavLink to="/home">Start QL</NavLink>
      </button>
    </div>
  );
}

export default WelcomePage;
