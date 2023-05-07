import { Navigate } from 'react-router-dom';

function WelcomePage() {
  const isUserLogged = true;
  if (isUserLogged) {
    return <div>Hello from welcomePage</div>;
  }
  return <Navigate to="/login" replace />;
}

export default WelcomePage;
