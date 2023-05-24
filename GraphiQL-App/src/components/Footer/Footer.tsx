import { Typography, Grid, Box, CssBaseline, Container, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RSLogo from '/RSLogo.svg';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={7} md={4} sm={6} sx={{ textAlign: 'center' }}>
            <div className="footer__accounts">
              <Button
                className="GH_link"
                href="https://github.com/slysnek"
                variant="text"
                color="primary"
                target="_blank"
                startIcon={<GitHubIcon color="secondary" />}
              >
                <span className="non_visible">Slysnek</span>
              </Button>
              <Button
                href="https://github.com/skuzema"
                variant="text"
                target="_blank"
                color="primary"
                startIcon={<GitHubIcon color="secondary" />}
                className="GH_link"
              >
                <span className="non_visible">Skuzema</span>
              </Button>
              <Button
                href="https://github.com/SergikEnergy"
                className="GH_link"
                target="_blank"
                variant="text"
                color="primary"
                startIcon={<GitHubIcon color="secondary" />}
              >
                <span className="non_visible">Sergik</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={2} md={4} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography className="year__created" color="white" variant="subtitle1">
                2023
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} md={4} sm={3} sx={{ textAlign: 'center' }}>
            <Button href="https://rs.school/react/" sx={{ pt: 0, pb: 0 }}>
              <img src={RSLogo} alt="React Course" className="footer_logo" />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
