import { useState } from 'react';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import FormularioTarjeta from '../Components/FormularioTarjeta';
import { useAuth } from '../context/AuthContext';
import { CUENTA_DEMO } from '../services/banco';

const Login = () => {
  const { usuario, ingresar } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (usuario && !cargando) return <Navigate to="/cuenta" replace />;

  const handleChange = ({ target: { name, value } }) => {
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError('');
    setCargando(true);
    try {
      await ingresar(form.email, form.password);
      navigate(location.state?.desde ?? '/cuenta', { replace: true });
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormularioTarjeta titulo="Ingresa a tu cuenta" subtitulo="Bienvenido de nuevo a Banco Tucán">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
        <Alert severity="info">
          Cuenta demo: <strong>{CUENTA_DEMO.email}</strong> / <strong>{CUENTA_DEMO.password}</strong>
        </Alert>
        <TextField
          name="email"
          type="email"
          label="Correo electrónico"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="password"
          type="password"
          label="Contraseña"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" loading={cargando} disabled={!form.email || !form.password}>
          Ingresar
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          ¿No tienes cuenta?{' '}
          <Link component={RouterLink} to="/registro">Ábrela aquí</Link>
        </Typography>
      </Stack>
    </FormularioTarjeta>
  );
};

export default Login;
