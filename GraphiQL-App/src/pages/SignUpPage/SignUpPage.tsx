import { Link } from 'react-router-dom';

function SignUpPage() {
  return (
    <>
      <h1>Hello from Register</h1>

      <p>
        Do you have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}

export default SignUpPage;
