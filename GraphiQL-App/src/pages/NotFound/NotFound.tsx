import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import './NotFound.css';
import NotFoundImg from '/404_img.gif';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
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
          {t('404.gone')}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{ fontSize: '1.3rem', padding: '1rem 0', mb: '5px' }}
        >
          {t('404.notFound')}
        </Typography>
        <Link to="/">
          <Button variant="contained" endIcon={<HomeIcon />}>
            {t('404.back')}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
