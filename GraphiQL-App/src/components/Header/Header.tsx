import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { auth, logout } from '../../helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AppBar, Typography, Toolbar, Container, Box, Button } from '@mui/material';
import logoImg from '/graphql.svg';
import './Header.css';

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (user) {
      setIsUserLogged(true);
    }
    setIsUserLogged(false);
  }, [user]);

  const handleExitByClick = () => {
    dispatch(exitUser());
    logout();
  };

  return (
    <AppBar position="fixed" className={sticky ? 'header' : 'header isSticky'}>
      <Container fixed>
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
              Welcome
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
      </Container>
    </AppBar>
  );
}
