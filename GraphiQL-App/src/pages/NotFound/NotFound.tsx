import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">To home page</Link>
    </>
  );
}

export default NotFound;
