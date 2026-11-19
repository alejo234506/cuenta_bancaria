import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { usuario, salir } = useAuth();

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 72 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'inherit', textDecoration: 'none', mr: 'auto' }}
          >
            <img src={logo} alt="" width={40} height={40} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 800, color: 'primary.main' }}>
              Banco Tucán
            </Typography>
          </Box>

          {usuario ? (
            <>
              <Button component={RouterLink} to="/cuenta" color="primary">
                Mi cuenta
              </Button>
              <Button onClick={salir} variant="outlined">
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/registro" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                Abrir cuenta
              </Button>
              <Button component={RouterLink} to="/login" variant="contained" color="secondary">
                Ingresar
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
