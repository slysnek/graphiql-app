import { Navigate } from 'react-router-dom';

function Home() {
  const isUserLogged = true;
  if (isUserLogged) {
    return <div>This is a home page</div>;
  }
  return <Navigate to="/login" replace />;
}

export default Home;
