// "Backend" simulado del banco.
// La API original (bank.jedidiazfagundez.site) ya no existe, así que los datos
// se guardan en localStorage del navegador. Las funciones son async y tienen
// una pequeña espera para imitar una petición HTTP real.

const CLAVE_USUARIOS = 'banco-tucan:usuarios';
const CLAVE_SESION = 'banco-tucan:sesion';

export const CUENTA_DEMO = { email: 'demo@bancotucan.co', password: 'demo1234' };

const esperar = (ms = 450) => new Promise((resolver) => setTimeout(resolver, ms));

const nuevoId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const generarNumeroCuenta = () =>
  `40${Math.floor(Math.random() * 1e8).toString().padStart(8, '0')}`;

function movimiento(tipo, monto, descripcion, fecha = new Date().toISOString()) {
  return { id: nuevoId(), tipo, monto, descripcion, fecha };
}

function datosIniciales() {
  const hace = (dias) => new Date(Date.now() - dias * 86400000).toISOString();
  return [
    {
      id: 'demo',
      nombre: 'Usuario Demo',
      email: CUENTA_DEMO.email,
      password: CUENTA_DEMO.password,
      numeroCuenta: '4012345678',
      saldo: 1250000,
      // Del más reciente al más antiguo
      movimientos: [
        movimiento('transferencia-enviada', 70000, 'Transferencia a Ana Gómez', hace(2)),
        movimiento('retiro', 180000, 'Retiro en cajero', hace(4)),
        movimiento('ingreso', 1500000, 'Pago de nómina', hace(6)),
      ],
    },
    {
      id: 'ana',
      nombre: 'Ana Gómez',
      email: 'ana@bancotucan.co',
      password: 'ana12345',
      numeroCuenta: '4098765432',
      saldo: 540000,
      movimientos: [movimiento('transferencia-recibida', 70000, 'Transferencia de Usuario Demo', hace(2))],
    },
  ];
}

function leerUsuarios() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
    if (Array.isArray(guardado) && guardado.length) return guardado;
  } catch {
    // datos corruptos o localStorage bloqueado: se reinicia con los datos de ejemplo
  }
  const iniciales = datosIniciales();
  guardarUsuarios(iniciales);
  return iniciales;
}

function guardarUsuarios(usuarios) {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  } catch {
    // sin almacenamiento (modo privado): los datos solo viven en memoria
  }
}

/** Quita la contraseña antes de devolver el usuario a la interfaz. */
function publico(usuario) {
  const { password: _omitida, ...resto } = usuario;
  return resto;
}

function validarMonto(monto) {
  const valor = Number(monto);
  if (!Number.isFinite(valor) || valor <= 0) throw new Error('El monto debe ser mayor que cero.');
  if (!Number.isInteger(valor)) throw new Error('El monto debe ser un valor entero en pesos.');
  return valor;
}

function buscarPorId(usuarios, id) {
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) throw new Error('La sesión no es válida, vuelve a ingresar.');
  return usuario;
}

export async function iniciarSesion(email, password) {
  await esperar();
  const correo = email.trim().toLowerCase();
  const usuario = leerUsuarios().find((u) => u.email === correo);
  if (!usuario || usuario.password !== password) {
    throw new Error('Correo o contraseña incorrectos.');
  }
  localStorage.setItem(CLAVE_SESION, usuario.id);
  return publico(usuario);
}

export async function registrar({ nombre, email, password }) {
  await esperar();
  const correo = email.trim().toLowerCase();
  if (!nombre.trim()) throw new Error('Escribe tu nombre.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) throw new Error('El correo no es válido.');
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');

  const usuarios = leerUsuarios();
  if (usuarios.some((u) => u.email === correo)) throw new Error('Ya existe una cuenta con ese correo.');

  const usuario = {
    id: nuevoId(),
    nombre: nombre.trim(),
    email: correo,
    password,
    numeroCuenta: generarNumeroCuenta(),
    saldo: 0,
    movimientos: [],
  };
  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  localStorage.setItem(CLAVE_SESION, usuario.id);
  return publico(usuario);
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

export function usuarioActual() {
  try {
    const id = localStorage.getItem(CLAVE_SESION);
    const usuario = id && leerUsuarios().find((u) => u.id === id);
    return usuario ? publico(usuario) : null;
  } catch {
    return null;
  }
}

export async function depositar(id, monto) {
  await esperar();
  const valor = validarMonto(monto);
  const usuarios = leerUsuarios();
  const usuario = buscarPorId(usuarios, id);
  usuario.saldo += valor;
  usuario.movimientos.unshift(movimiento('ingreso', valor, 'Depósito'));
  guardarUsuarios(usuarios);
  return publico(usuario);
}

export async function retirar(id, monto) {
  await esperar();
  const valor = validarMonto(monto);
  const usuarios = leerUsuarios();
  const usuario = buscarPorId(usuarios, id);
  if (valor > usuario.saldo) throw new Error('Saldo insuficiente para este retiro.');
  usuario.saldo -= valor;
  usuario.movimientos.unshift(movimiento('retiro', valor, 'Retiro'));
  guardarUsuarios(usuarios);
  return publico(usuario);
}

export async function transferir(id, numeroDestino, monto) {
  await esperar();
  const valor = validarMonto(monto);
  const usuarios = leerUsuarios();
  const origen = buscarPorId(usuarios, id);
  const destino = usuarios.find((u) => u.numeroCuenta === numeroDestino.trim());

  if (!destino) throw new Error('No existe una cuenta con ese número.');
  if (destino.id === origen.id) throw new Error('No puedes transferirte a tu propia cuenta.');
  if (valor > origen.saldo) throw new Error('Saldo insuficiente para esta transferencia.');

  origen.saldo -= valor;
  destino.saldo += valor;
  origen.movimientos.unshift(movimiento('transferencia-enviada', valor, `Transferencia a ${destino.nombre}`));
  destino.movimientos.unshift(movimiento('transferencia-recibida', valor, `Transferencia de ${origen.nombre}`));
  guardarUsuarios(usuarios);
  return publico(origen);
}

/** Borra todos los datos guardados y vuelve a los datos de ejemplo. */
export function reiniciarDatos() {
  localStorage.removeItem(CLAVE_USUARIOS);
  localStorage.removeItem(CLAVE_SESION);
}
