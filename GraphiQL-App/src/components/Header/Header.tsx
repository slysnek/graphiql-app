import { NavLink } from 'react-router-dom';
import { exitUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { logout } from '../../firebase';

export default function Header() {
  const dispatch = useAppDispatch();
  const isUserLogged = useAppSelector((state) => {
    return state.userAuth.email;
  });
  const handleExitByClick = () => {
    dispatch(exitUser());
    logout();
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            {/*home and welcome - only for test - delete after creating sticky header*/}
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/welcome">Welcome</NavLink>
          </li>
          {!isUserLogged && (
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
          {!isUserLogged && (
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          )}
          {isUserLogged && (
            <li>
              <button type="button" onClick={handleExitByClick}>
                Exit
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
