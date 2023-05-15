import { Link } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import Grid from '@mui/material/Grid/Grid';

function SignUpPage() {
  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        mt: '60px',
        textAlign: 'center',
        width: '60%',
      }}
      component="main"
      className="margin-sticky"
      container
    >
      <SignUp />
      <Grid item xs={12} sx={{ fontWeight: '500', fontSize: '1.2rem' }}>
        <p>
          Do you have an account? <Link to="/login">Log In</Link>
        </p>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
