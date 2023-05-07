import { Navigate, NavLink } from 'react-router-dom';

function WelcomePage() {
  const isUserLogged = true;
  if (isUserLogged) {
    return (
      <div>
        <p>Hello from welcomePage</p>
        <button type="button">
          <NavLink to="/home">Start QL</NavLink>
        </button>
      </div>
    );
  }
  return <Navigate to="/login" replace />;
}

export default WelcomePage;
