import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CUENTA_DEMO } from '../services/banco';

const ventajas = [
  { titulo: 'Depósitos y retiros', texto: 'Mueve tu dinero al instante y ve tu saldo actualizado.' },
  { titulo: 'Transferencias', texto: 'Envía dinero a otras cuentas del banco con su número.' },
  { titulo: 'Historial', texto: 'Consulta cada movimiento con fecha, tipo y monto.' },
];

const Inicio = () => {
  const { usuario } = useAuth();

  return (
    <>
      <Box sx={{ background: 'linear-gradient(135deg, #0f4c5c 0%, #136f63 60%, #2a9d8f 100%)', color: '#fff' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} sx={{ alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>
                Banca en línea · Proyecto de práctica
              </Typography>
              <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, my: 2 }}>
                Tu dinero, claro y a la mano.
              </Typography>
              <Typography sx={{ fontSize: '1.15rem', opacity: 0.9, maxWidth: 520, mb: 4 }}>
                Abre una cuenta en segundos, deposita, retira y transfiere. Todo se guarda en tu navegador.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {usuario ? (
                  <Button component={RouterLink} to="/cuenta" size="large" variant="contained" color="secondary">
                    Ir a mi cuenta
                  </Button>
                ) : (
                  <>
                    <Button component={RouterLink} to="/registro" size="large" variant="contained" color="secondary">
                      Abrir mi cuenta
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/login"
                      size="large"
                      variant="outlined"
                      sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.6)' }}
                    >
                      Ya tengo cuenta
                    </Button>
                  </>
                )}
              </Stack>
            </Box>

            <Paper
              elevation={0}
              sx={{
                flex: '0 0 auto',
                width: { xs: '100%', sm: 380 },
                p: 3.5,
                borderRadius: 2,
                color: '#fff',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Cuenta de ahorros</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, my: 1 }}>$ 1.250.000</Typography>
              <Typography sx={{ letterSpacing: 3, opacity: 0.9, mb: 3 }}>40•• •••• 78</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Prueba con la cuenta demo</Typography>
              <Typography sx={{ fontFamily: 'monospace' }}>{CUENTA_DEMO.email}</Typography>
              <Typography sx={{ fontFamily: 'monospace' }}>{CUENTA_DEMO.password}</Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {ventajas.map(({ titulo, texto }) => (
            <Paper key={titulo} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>{titulo}</Typography>
              <Typography color="text.secondary">{texto}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Inicio;
