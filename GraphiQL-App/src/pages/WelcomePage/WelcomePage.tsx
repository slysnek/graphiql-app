import { redirect } from 'react-router-dom';

function WelcomePage() {
  const isUserLogged = true;
  if (isUserLogged) {
    return <div>Hello from welcomePage</div>;
  }
  return redirect('/login');
}

export default WelcomePage;
