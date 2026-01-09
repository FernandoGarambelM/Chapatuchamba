// Configuración base de la API
const API_CONFIG = {
  // Configuración por defecto para desarrollo
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// Instancia base de API Service
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  // Método genérico para hacer requests
  async request(method, url, data = null, options = {}) {
    const config = {
      method: method.toUpperCase(),
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers
      }
    }

    // Agregar token si existe
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Agregar body si hay data
    if (data) {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, config)
      
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`)
      }
      
      const contentType = response.headers.get('Content-Type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return await response.text()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Métodos específicos
  get(url, options = {}) {
    return this.request('GET', url, null, options)
  }

  post(url, data, options = {}) {
    return this.request('POST', url, data, options)
  }

  put(url, data, options = {}) {
    return this.request('PUT', url, data, options)
  }

  delete(url, options = {}) {
    return this.request('DELETE', url, null, options)
  }
}

// Instancia singleton
const apiService = new ApiService()

// Métodos de autenticación
export const authAPI = {
  // Login clásico - POST /api/auth/login
  login: async (credentials) => {
    return await apiService.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    })
  },

  // Registro de estudiante - POST /api/auth/register/student
  registerStudent: async (userData) => {
    return await apiService.post('/auth/register/student', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      carrera: userData.carrera,
      universidad: userData.universidad,
      resumen: userData.resumen || null
    })
  },

  // Logout
  logout: async () => {
    // Limpiar token local
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    return { success: true }
  },

  // Verificar token
  verifyToken: async () => {
    return await apiService.get('/auth/verify')
  },

  // Refrescar token
  refreshToken: async () => {
    return await apiService.post('/auth/refresh')
  }
}

// Métodos para retos
export const challengesAPI = {
  // Obtener todos los retos
  getAll: () => apiService.get('/challenges'),

  // Obtener reto por ID
  getById: (id) => apiService.get(`/challenges/${id}`),

  // Crear nuevo reto
  create: (challengeData) => apiService.post('/challenges', challengeData),

  // Actualizar reto
  update: (id, challengeData) => apiService.put(`/challenges/${id}`, challengeData),

  // Eliminar reto
  delete: (id) => apiService.delete(`/challenges/${id}`),

  // Subir solución
  submitSolution: (challengeId, solutionData) => 
    apiService.post(`/challenges/${challengeId}/solutions`, solutionData)
}

// Configuración de environment
export const setApiBaseUrl = (newBaseUrl) => {
  apiService.baseURL = newBaseUrl
}

export default apiService