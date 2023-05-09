import { NavLink } from 'react-router-dom';
import { exitUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { logout } from '../../firebase';

export default function Header() {
  const dispatch = useAppDispatch();
  const isUserLogged = useAppSelector((state) => {
    return state.userAuth.email;
  });

  if (isUserLogged) {
    return (
      <header className="header">
        <nav>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/welcome">Welcome</NavLink>
            </li>
            <li>
              <NavLink to="/login">LogIn</NavLink>
            </li>
            <li>
              <NavLink to="/register">SignUp</NavLink>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => {
            dispatch(exitUser());
            logout();
          }}
        >
          Exit
        </button>
      </header>
    );
  }
  return <div>Header without sign-out button with links to log-in/signUp</div>;
}
