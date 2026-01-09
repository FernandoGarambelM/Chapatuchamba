// Servicios para manejar llamadas relacionadas a challenges (API)
import { challengesAPI } from '../../services/api'

// Obtener todos los challenges
export async function fetchChallenges() {
  try {
    const response = await challengesAPI.getAll()
    
    // Verificar si la respuesta es exitosa
    if (response.success) {
      return response.data || []
    } else {
      console.error('Error fetching challenges:', response.errors)
      throw new Error(response.message || 'Error al obtener los retos')
    }
  } catch (error) {
    console.error('Network error fetching challenges:', error)
    throw error
  }
}

// Obtener challenge por ID
export async function fetchChallengeById(id) {
  try {
    const response = await challengesAPI.getById(id)
    
    if (response.success) {
      return response.data
    } else {
      console.error('Error fetching challenge:', response.errors)
      throw new Error(response.message || 'Error al obtener el reto')
    }
  } catch (error) {
    console.error('Network error fetching challenge by ID:', error)
    
    // Fallback: usar fetchChallenges y filtrar por ID
    console.warn('API de challenge by ID no funciona, intentando con fetchChallenges...')
    try {
      const allChallenges = await fetchChallenges()
      const challenge = allChallenges.find(c => c.id == id)
      
      if (challenge) {
        return challenge
      } else {
        throw new Error(`Challenge con ID ${id} no encontrado`)
      }
    } catch (fallbackError) {
      console.error('Error en fallback fetchChallenges:', fallbackError)
      throw fallbackError
    }
  }
}

// Crear nuevo challenge
export async function createChallenge(challengeData) {
  try {
    const response = await challengesAPI.create(challengeData)
    
    if (response.success) {
      return response.data
    } else {
      console.error('Error creating challenge:', response.errors)
      throw new Error(response.message || 'Error al crear el reto')
    }
  } catch (error) {
    console.error('Network error creating challenge:', error)
    throw error
  }
}

// Actualizar challenge
export async function updateChallenge(id, challengeData) {
  try {
    const response = await challengesAPI.update(id, challengeData)
    
    if (response.success) {
      return response.data
    } else {
      console.error('Error updating challenge:', response.errors)
      throw new Error(response.message || 'Error al actualizar el reto')
    }
  } catch (error) {
    console.error('Network error updating challenge:', error)
    throw error
  }
}

// Eliminar challenge
export async function deleteChallenge(id) {
  try {
    const response = await challengesAPI.delete(id)
    
    if (response.success) {
      return true
    } else {
      console.error('Error deleting challenge:', response.errors)
      throw new Error(response.message || 'Error al eliminar el reto')
    }
  } catch (error) {
    console.error('Network error deleting challenge:', error)
    throw error
  }
}

// Subir solución a un challenge
export async function submitSolution(challengeId, solutionData) {
  try {
    const response = await challengesAPI.submitSolution(challengeId, solutionData)
    
    if (response.success) {
      return response.data
    } else {
      console.error('Error submitting solution:', response.errors)
      throw new Error(response.message || 'Error al enviar la solución')
    }
  } catch (error) {
    console.error('Network error submitting solution:', error)
    throw error
  }
}
