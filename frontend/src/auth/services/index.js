// Servicios relacionados con autenticación - ahora usando la API configurada
import { authAPI, challengesAPI } from '../../services/api'

// Re-exportar métodos específicos para compatibilidad
export const login = authAPI.login
export const logout = authAPI.logout
export const registerStudent = authAPI.registerStudent

// Re-exportar objetos completos
export { authAPI, challengesAPI }

// Helpers para manejo de datos de usuario en localStorage
export const userHelpers = {
  // Obtener datos completos del usuario desde localStorage
  getUserData: () => {
    const userId = localStorage.getItem('userId')
    if (!userId) return null
    
    return {
      id: parseInt(userId),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      university: localStorage.getItem('university'),
      major: localStorage.getItem('major'),
      globalScore: parseInt(localStorage.getItem('globalScore')) || 0,
      bio: localStorage.getItem('bio'),
      // Datos de empresa (solo si es COMPANY)
      companyName: localStorage.getItem('companyName'),
      sector: localStorage.getItem('sector'),
      ruc: localStorage.getItem('ruc'),
      description: localStorage.getItem('description'),
      isVerified: localStorage.getItem('isVerified') === 'true'
    }
  },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },
  
  // Obtener el rol del usuario
  getUserRole: () => {
    return localStorage.getItem('role')
  },
  
  // Obtener el ID del usuario
  getUserId: () => {
    const id = localStorage.getItem('userId')
    return id ? parseInt(id) : null
  }
}

export async function register(payload) {
  // placeholder: reemplazar por llamada real a la API de registro
  // se devuelve un objeto simulado con el usuario creado
  return Promise.resolve({ ok: true, data: { id: 'user_1', ...payload } })
}
