import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { auth, logout } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { Typography, Toolbar, Button, Grid } from '@mui/material';
import logoImg from '/graphql.svg';
import './Header.css';
import { useTranslation } from 'react-i18next';
import { setLang } from '../../store/slices/langSlice';

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const userEmail = useAppSelector((state) => state.userAuth.email);
  const userName = useAppSelector((state) => state.userAuth.name);
  const isUserLogged = !!userEmail || !!userName;
  const language = useAppSelector((state) => state.langState.language);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    const listenLogged = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email ? currentUser.email : '',
            id: currentUser.uid,
            name: '',
            token: currentUser.refreshToken,
          })
        );
      }
      if (!currentUser) {
        dispatch(exitUser());
      }
    });

    return () => {
      listenLogged();
    };
  }, [dispatch]);

  const handleExitByClick = () => {
    dispatch(exitUser());
    logout();
  };

  return (
    <header className={sticky ? 'header isSticky' : 'header'}>
      <Toolbar
        sx={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Grid container className="header__container">
          <Grid
            item
            container
            xs={3}
            className="header-logo__box"
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '',
            }}
            onClick={() => {
              navigate('/', { replace: true });
            }}
          >
            <img className="header-logo" src={logoImg} alt="GraphiQL Logo" />
            <Typography
              variant="h6"
              className="header-logo_text"
              component="h1"
              sx={{ backgroundColor: 'inherit' }}
            >
              GraphiQL
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {!isUserLogged && (
              <Button
                className="header__navigation"
                color="secondary"
                onClick={() => {
                  navigate('/login', { replace: true });
                }}
              >
                <span className="header__navigation_text">{t('header.signIn')}</span>
              </Button>
            )}
            {!isUserLogged && (
              <Button
                className="header__navigation"
                color="secondary"
                onClick={() => {
                  navigate('/register', { replace: true });
                }}
              >
                <span className="header__navigation_text">{t('header.signUp')}</span>
              </Button>
            )}
            {isUserLogged && (
              <Button className="header__navigation" onClick={handleExitByClick} color="secondary">
                <span className="header__navigation_text">{t('header.exit')}</span>
              </Button>
            )}
          </Grid>
          <Grid item xs={3}>
            <Button
              className="header__language"
              color={language === 'en' ? 'secondary' : 'primary'}
              style={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}
              onClick={() => {
                dispatch(setLang('en'));
              }}
            >
              <span className="header__language_variant">EN</span>
            </Button>
            <Button
              className="header__language"
              color={language === 'ru' ? 'secondary' : 'primary'}
              style={{ fontWeight: language === 'ru' ? 'bold' : 'normal' }}
              onClick={() => {
                dispatch(setLang('ru'));
              }}
            >
              <span className="header__language_variant">RU</span>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </header>
  );
}
