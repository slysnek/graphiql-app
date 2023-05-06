import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <h1>Hello from Login</h1>

      <p>
        Don't have an account? <Link to="/register">Register now</Link>
      </p>
    </>
  );
}

export default LoginPage;
