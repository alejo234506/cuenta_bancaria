import { useState } from 'react';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import FormularioTarjeta from '../Components/FormularioTarjeta';
import { useAuth } from '../context/AuthContext';

const Registro = () => {
  const { usuario, registrar } = useAuth();
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (usuario && !cargando) return <Navigate to="/cuenta" replace />;

  const handleChange = ({ target: { name, value } }) => {
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError('');
    setCargando(true);
    try {
      await registrar(form);
      navigate('/cuenta', { replace: true });
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormularioTarjeta titulo="Abre tu cuenta" subtitulo="Gratis y en menos de un minuto">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
        <TextField name="nombre" label="Nombre completo" autoComplete="name" value={form.nombre} onChange={handleChange} required fullWidth />
        <TextField name="email" type="email" label="Correo electrónico" autoComplete="email" value={form.email} onChange={handleChange} required fullWidth />
        <TextField
          name="password"
          type="password"
          label="Contraseña"
          autoComplete="new-password"
          helperText="Mínimo 6 caracteres. No uses una contraseña real."
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" loading={cargando}>
          Crear cuenta
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login">Ingresa</Link>
        </Typography>
      </Stack>
    </FormularioTarjeta>
  );
};

export default Registro;
