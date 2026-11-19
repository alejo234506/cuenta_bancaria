import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Redirige al login si no hay sesión iniciada. */
const RutaPrivada = ({ children }) => {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  return children;
};

export default RutaPrivada;
