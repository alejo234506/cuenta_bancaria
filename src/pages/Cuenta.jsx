import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import * as banco from '../services/banco';
import { formatearFecha, formatearPesos } from '../utils/formato';

const TIPOS = {
  ingreso: { etiqueta: 'Depósito', color: 'success', signo: '+' },
  retiro: { etiqueta: 'Retiro', color: 'error', signo: '−' },
  'transferencia-enviada': { etiqueta: 'Enviada', color: 'warning', signo: '−' },
  'transferencia-recibida': { etiqueta: 'Recibida', color: 'success', signo: '+' },
};

const OPERACIONES = ['depositar', 'retirar', 'transferir'];

const Cuenta = () => {
  const { usuario, setUsuario } = useAuth();
  const [operacion, setOperacion] = useState('depositar');
  const [monto, setMonto] = useState('');
  const [destino, setDestino] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cambiarOperacion = (_evento, nueva) => {
    setOperacion(nueva);
    setMensaje(null);
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setMensaje(null);
    setCargando(true);
    try {
      let actualizado;
      if (operacion === 'depositar') actualizado = await banco.depositar(usuario.id, monto);
      else if (operacion === 'retirar') actualizado = await banco.retirar(usuario.id, monto);
      else actualizado = await banco.transferir(usuario.id, destino, monto);

      setUsuario(actualizado);
      setMensaje({ tipo: 'success', texto: `Listo: ${operacion === 'depositar' ? 'depósito' : operacion === 'retirar' ? 'retiro' : 'transferencia'} por ${formatearPesos(Number(monto))}.` });
      setMonto('');
      setDestino('');
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 3 }}>
        Hola, {usuario.nombre.split(' ')[0]}
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'start' }}>
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{ p: 4, borderRadius: 1.5, color: '#fff', background: 'linear-gradient(135deg, #0f4c5c, #2a9d8f)' }}
          >
            <Typography sx={{ opacity: 0.85 }}>Saldo disponible</Typography>
            <Typography variant="h3" component="p" sx={{ fontWeight: 800, my: 1, fontSize: { xs: '2.2rem', sm: '3rem' } }}>
              {formatearPesos(usuario.saldo)}
            </Typography>
            <Typography sx={{ opacity: 0.85 }}>
              Cuenta de ahorros N.º <strong>{usuario.numeroCuenta}</strong>
            </Typography>
          </Paper>

          <Paper variant="outlined" sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
            <Tabs value={operacion} onChange={cambiarOperacion} variant="fullWidth" aria-label="Operaciones">
              {OPERACIONES.map((op) => (
                <Tab key={op} value={op} label={op[0].toUpperCase() + op.slice(1)} />
              ))}
            </Tabs>
            <Stack component="form" spacing={2} sx={{ p: 3 }} onSubmit={handleSubmit} noValidate>
              {operacion === 'transferir' && (
                <TextField
                  label="Número de cuenta destino"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value.replace(/\D/g, ''))}
                  helperText="Prueba con 4098765432 (Ana Gómez)"
                  slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                  required
                />
              )}
              <TextField
                label="Monto en pesos"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                slotProps={{ htmlInput: { min: 1, step: 1000 } }}
                required
              />
              {mensaje && <Alert severity={mensaje.tipo}>{mensaje.texto}</Alert>}
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={cargando}
                disabled={!monto || (operacion === 'transferir' && !destino)}
              >
                {operacion[0].toUpperCase() + operacion.slice(1)}
              </Button>
            </Stack>
          </Paper>
        </Stack>

        <Paper variant="outlined" sx={{ borderRadius: 1.5, p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            Movimientos
          </Typography>
          {usuario.movimientos.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              Aún no tienes movimientos. Haz tu primer depósito.
            </Typography>
          ) : (
            <List disablePadding>
              {usuario.movimientos.slice(0, 20).map((mov) => {
                const tipo = TIPOS[mov.tipo];
                return (
                  <ListItem key={mov.id} divider disableGutters sx={{ gap: 2 }}>
                    <ListItemText primary={mov.descripcion} secondary={formatearFecha(mov.fecha)} />
                    <Stack sx={{ alignItems: 'flex-end' }} spacing={0.5}>
                      <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: `${tipo.color}.main` }}>
                        {tipo.signo} {formatearPesos(mov.monto)}
                      </Typography>
                      <Chip size="small" label={tipo.etiqueta} color={tipo.color} variant="outlined" />
                    </Stack>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Cuenta;
