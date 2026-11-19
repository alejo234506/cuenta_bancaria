import { createContext, useContext, useState } from 'react';
import * as banco from '../services/banco';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => banco.usuarioActual());

  const valor = {
    usuario,
    setUsuario,
    async ingresar(email, password) {
      setUsuario(await banco.iniciarSesion(email, password));
    },
    async registrar(datos) {
      setUsuario(await banco.registrar(datos));
    },
    salir() {
      banco.cerrarSesion();
      setUsuario(null);
    },
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return contexto;
}
