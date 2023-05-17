import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import LogIn from '../../components/LogIn/LogIn';

function LoginPage() {
  return (
    <Container component="main" maxWidth="xl" className="margin-sticky" sx={{ minHeight: '500px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          mt: '60px',
          textAlign: 'center',
          width: '60%',
        }}
      >
        <LogIn />
        <Box sx={{ fontWeight: '500', fontSize: '1.2rem', width: '100%', mt: '20px' }}>
          <Typography variant="h6" component="p">
            Don't have an account? <Link to="/register">Register now</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
