import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Link, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const theme = createTheme({
  typography: {
    fontFamily: 'Source Code Pro, monospace',
  },
  palette: {
    background: {
        paper: '#000',
    },
    primary: {
        main: '#fff',
    }
  },
});

function Footer(): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3rem', position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <Typography variant='caption' color='primary.main' sx={{ mr: 1 }}>Created by:</Typography>
            <Typography variant='caption' color='primary.main'>{`krulsaidme0w`}</Typography>
            <Link href='https://github.com/krulsaidme0w' target='_blank' rel='noopener'>
                <IconButton sx={{ color: 'primary.main' }}>
                    <GitHubIcon />
                </IconButton>
            </Link>
        </Box>
      </ThemeProvider>
    );
  }
  
  export default Footer;