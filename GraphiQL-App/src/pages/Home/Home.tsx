import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <p>This is a home page. Hello World!</p>
      </header>
    </>
  );
}

export default Home;
