// Servicios relacionados con autenticación (API calls, token handling)

export async function login(credentials) {
  // placeholder: reemplazar con llamada real
  return Promise.resolve({ ok: true, data: { token: 'fake-token' } })
}

export async function logout() {
  return Promise.resolve()
}

export async function register(payload) {
  // placeholder: reemplazar por llamada real a la API de registro
  // se devuelve un objeto simulado con el usuario creado
  return Promise.resolve({ ok: true, data: { id: 'user_1', ...payload } })
}
