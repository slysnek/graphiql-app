import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { auth, logout } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { Typography, Toolbar, Box, Button } from '@mui/material';
import logoImg from '/graphql.svg';
import './Header.css';
import { useTranslation } from 'react-i18next';
import { setLang } from '../../store/slices/langSlice';

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const isUserLogged = useAppSelector((state) => state.userAuth.email);
  const language = useAppSelector((state) => state.langState.language)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation()

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
  }, []);

  const handleExitByClick = () => {
    dispatch(exitUser());
    logout();
  };

  return (
    <header className={sticky ? 'header isSticky' : 'header'}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
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
          <Typography variant="h6" component="h1" sx={{ backgroundColor: 'inherit' }}>
            GraphiQL
          </Typography>
        </Box>
        <Box>
          <Button color='primary' style={ {fontWeight: language === 'EN' ? 'bold' : 'normal'}} onClick={() => {dispatch(setLang('EN'))}}>EN</Button>
          <Button color='primary' style={ {fontWeight: language === 'RU' ? 'bold' : 'normal'}} onClick={() => {dispatch(setLang('RU'))}}>RU</Button>
        </Box>
        <Box>
          <Button
            color="secondary"
            onClick={() => {
              navigate('/home', { replace: true });
            }}
          >
            Home
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              navigate('/welcome', { replace: true });
            }}
          >
            {t('main.header')}
          </Button>
          {!isUserLogged && (
            <Button
              color="secondary"
              onClick={() => {
                navigate('/login', { replace: true });
              }}
            >
              Sign In
            </Button>
          )}
          {!isUserLogged && (
            <Button
              color="secondary"
              onClick={() => {
                navigate('/register', { replace: true });
              }}
            >
              Sign Up
            </Button>
          )}
          {isUserLogged && (
            <Button onClick={handleExitByClick} color="secondary">
              Exit
            </Button>
          )}
        </Box>
      </Toolbar>
    </header>
  );
}
