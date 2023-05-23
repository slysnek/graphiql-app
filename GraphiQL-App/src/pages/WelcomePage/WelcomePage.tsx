import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../helpers/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setName, UserState } from '../../store/slices/userSlice';
import { useTranslation } from 'react-i18next';
import UserCards from '../../components/UserCards/UserCards';

import './WelcomePage.css';

import ReactIcon from '/icons/ReactIcon.png';
import TSIcon from '/icons/TSIcon.png';
import CSS3Icon from '/icons/CSS3Icon.png';
import HTML5Icon from '/icons/HTML5Icon.png';
import MUIIcon from '/icons/MUIIcon.png';
import GraphQLIcon from '/icons/GraphQLIcon.png';
import ApolloIcon from '/icons/ApolloIcon.png';

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
          <span className="welcome__title_register">
            {t('welcomePage.greeting')} {userName}!
          </span>
        ) : (
          <span className="welcome__title_unregister">{t('welcomePage.requestToLogIn')}</span>
        )}
      </h3>

      <p className="welcome__greeting">{t('welcomePage.authors')}</p>
      <p className="welcome__members">{t('welcomePage.members')}</p>
      <div className="welcome__info">
        <UserCards />
      </div>
      <div className="welcome__stack">
        <p className="welcome__stack_title">{t('welcomePage.usedStack')}</p>
        <div className="welcome__stack_logos">
          <img src={ReactIcon} alt="React" className="welcome__stack_image" />
          <img src={TSIcon} alt="TypeScript" className="welcome__stack_image" />
          <img src={CSS3Icon} alt="CSS3" className="welcome__stack_image" />
          <img src={HTML5Icon} alt="HTML5" className="welcome__stack_image" />
          <img src={MUIIcon} alt="MUI" className="welcome__stack_image" />
          <img src={GraphQLIcon} alt="GraphQL" className="welcome__stack_image" />
          <img src={ApolloIcon} alt="Apollo" className="welcome__stack_image" />
        </div>
      </div>

      <button type="button" className="button__editor">
        <NavLink className="editor__link" to="/home">
          {t('welcomePage.editorButton')}
        </NavLink>
      </button>
    </div>
  );
}

export default WelcomePage;
