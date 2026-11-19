import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0f4c5c', contrastText: '#ffffff' },
    secondary: { main: '#f4a261', contrastText: '#1b1b1b' },
    success: { main: '#2a9d8f' },
    error: { main: '#c8553d' },
    background: { default: '#f4f1ec', paper: '#ffffff' },
    text: { primary: '#1b2a30', secondary: '#5b6b70' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default theme;
