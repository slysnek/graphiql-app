import { Link } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';

function SignUpPage() {
  return (
    <>
      <h1>Hello from Register</h1>
      <SignUp />

      <p>
        Do you have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}

export default SignUpPage;
