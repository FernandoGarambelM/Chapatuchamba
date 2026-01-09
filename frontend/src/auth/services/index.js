// Servicios relacionados con autenticación - ahora usando la API configurada
import { authAPI, challengesAPI } from '../../services/api'

// Re-exportar para compatibilidad
export { authAPI, challengesAPI }

// Re-exportar métodos específicos para compatibilidad
export const login = authAPI.login
export const logout = authAPI.logout
export const registerStudent = authAPI.registerStudent

// Re-exportar objetos completos
export { authAPI, challengesAPI }

export async function register(payload) {
  // placeholder: reemplazar por llamada real a la API de registro
  // se devuelve un objeto simulado con el usuario creado
  return Promise.resolve({ ok: true, data: { id: 'user_1', ...payload } })
}
