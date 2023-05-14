import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import './NotFound.css';
import NotFoundImg from '/404_img.gif';

function NotFound() {
  return (
    <main className="container_404">
      <div className="gif">
        <img src={NotFoundImg} alt="gif_ing" />
      </div>
      <div className="content">
        <Typography
          component="h1"
          variant="h2"
          className="main-heading"
          sx={{ backgroundColor: 'transparent', mt: '2rem' }}
        >
          This page is gone.
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{ fontSize: '1.3rem', padding: '1rem 0', mb: '5px' }}
        >
          ...maybe the page you're looking for is not found or never existed.
        </Typography>
        <Link to="/">
          <Button variant="contained" endIcon={<HomeIcon />}>
            Back to home
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
