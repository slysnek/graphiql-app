import { Typography, Grid, Box, CssBaseline, Container, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RSLogo from '/RSLogo.svg';

import './Footer.css';

function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        pt: '0.5rem',
        pb: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '40px',
        height: '60px',
        m: 'auto',
        backgroundColor: 'rgba(63, 174, 196, 0.7)',
        borderRadius: '6px',
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="white" variant="subtitle1">
                2023
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Button href="https://rs.school/react/" sx={{ pt: 0, pb: 0 }}>
              <img src={RSLogo} alt="React Course" className="footer_logo" />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
