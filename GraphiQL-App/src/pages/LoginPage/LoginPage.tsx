import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid/Grid';

import LogIn from '../../components/LogIn/LogIn';

function LoginPage() {
  return (
    <Grid container justifyContent="center" direction="column">
      <LogIn />
      <Grid item xs={12} sx={{ fontWeight: '500', fontSize: '1.2rem' }}>
        <p>
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
