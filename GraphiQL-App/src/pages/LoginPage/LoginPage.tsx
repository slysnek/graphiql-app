import { Link } from 'react-router-dom';

import LogIn from '../../components/LogIn/LogIn';

function LoginPage() {
  return (
    <>
      <h1>Hello from Login</h1>
      <LogIn />
      <p>
        Don't have an account? <Link to="/register">Register now</Link>
      </p>
    </>
  );
}

export default LoginPage;
