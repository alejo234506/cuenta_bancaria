import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import RutaPrivada from './Components/RutaPrivada';
import { AuthProvider } from './context/AuthContext';
import Cuenta from './pages/Cuenta';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';

// HashRouter: las rutas quedan como /#/login, así funcionan en GitHub Pages sin configurar el servidor.
const App = () => (
  <AuthProvider>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/cuenta"
            element={
              <RutaPrivada>
                <Cuenta />
              </RutaPrivada>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </AuthProvider>
);

export default App;
