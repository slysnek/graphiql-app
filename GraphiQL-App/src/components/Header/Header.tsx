import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { logout } from '../../firebase';
import { AppBar, Typography, Toolbar, SvgIcon, Container, Box, Button } from '@mui/material';
import logoImg from '/graphql.svg';
import './Header.css';

export default function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isUserLogged = useAppSelector((state) => {
    return state.userAuth.email;
  });

  const handleExitByClick = () => {
    dispatch(exitUser());
    logout();
  };

  return (
    <AppBar
      position={sticky ? 'fixed' : 'static'}
      className={sticky ? 'header' : 'header isSticky'}
      sx={
        sticky
          ? {
              minHeight: '50px',
              backgroundColor: `rgba(63, 174, 196, 1)`,
              alignItems: 'center',
              transition: 'all easy 1s',
            }
          : {
              minHeight: '50px',
              backgroundColor: `rgba(63, 174, 196, 0.5)`,
              transition: 'all easy 1s',
            }
      }
    >
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
            {/*home and welcome - only for test - delete after creating sticky header*/}
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
