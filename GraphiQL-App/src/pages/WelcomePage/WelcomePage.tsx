import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../helpers/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setName, UserState } from '../../store/slices/userSlice';
import { useTranslation } from 'react-i18next';
import UserCard from '../../components/UserCard/UserCard';

import './WelcomePage.css';

function WelcomePage() {
  const dispatch = useAppDispatch();

  const [user] = useAuthState(auth);
  const initialData = useAppSelector((state) => state.userAuth);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      dispatch(exitUser());
      return;
    } else {
      setUserName(initialData);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="margin-sticky welcome" style={{ minHeight: '300px' }}>
      <h3 className="welcome__title">
        {userName ? (
          <span>
            {t('welcomePage.greeting')} {userName}!
          </span>
        ) : (
          <span>{t('welcomePage.requestToLogIn')}</span>
        )}
      </h3>

      <div className="AppWelcome">
        <UserCard />
      </div>

      <p className="welcome__authors">{t('welcomePage.authors')}</p>
      <p className="welcome__animation">Here will be animation</p>
      <div className="welcome__info authors">
        <h4 className="authors__name">Slysnek</h4>
        <p className="authors__content">{t('welcomePage.author_1')}</p>
        <figure className="authors__avarar avatar">
          <img className="avatar__img" src="" alt="author avatar" />
          <figcaption className="avatar__description">avatar description</figcaption>
        </figure>

        <h4>Skuzema</h4>
        <p>{t('welcomePage.author_2')}</p>
        <h4>Sergik</h4>
        <p>{t('welcomePage.author_3')}</p>
      </div>

      <button type="button">
        <NavLink to="/home">Open editor</NavLink>
      </button>
    </div>
  );
}

export default WelcomePage;
