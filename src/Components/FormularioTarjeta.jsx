import { Box, Container, Paper, Typography } from '@mui/material';
import logo from '../assets/logo.svg';

/** Contenedor centrado para los formularios de login y registro. */
const FormularioTarjeta = ({ titulo, subtitulo, children }) => (
  <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
    <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 }, borderRadius: 1.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, textAlign: 'center' }}>
        <img src={logo} alt="" width={56} height={56} />
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800, mt: 2 }}>{titulo}</Typography>
        {subtitulo && <Typography color="text.secondary" sx={{ mt: 0.5 }}>{subtitulo}</Typography>}
      </Box>
      {children}
    </Paper>
  </Container>
);

export default FormularioTarjeta;
