import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components'
import { fetchChallenges } from '../services'
import { StudentChallengeView, CompanyChallengeView } from '../components'

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [challenge, setChallenge] = useState(null)
  const [error, setError] = useState('')
  const [userRole, setUserRole] = useState('')
  
  // Estado para el countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Función para mapear propiedades de la API a las del componente
  const mapChallengeData = (challenge) => {
    if (!challenge) return null
    return {
      ...challenge,
      titulo: challenge.title,
      empresa: challenge.companyName,
      descripcion: challenge.description,
      fechaFin: challenge.endDate,
      fechaInicio: challenge.startDate,
      estado: challenge.status === 'ACTIVE' ? 'activo' : 
              challenge.status === 'COMPLETED' ? 'finalizado' : 'inactivo'
    }
  }

  // Función para obtener el challenge mapeado
  const getMappedChallenge = () => mapChallengeData(challenge)

  useEffect(() => {
    // Obtener el rol del usuario
    const role = localStorage.getItem('role')
    setUserRole(role || '')
    
    fetchChallengeDetail()
  }, [id])

  // Función para calcular el tiempo restante
  const calculateTimeLeft = (endDate) => {
    const difference = +new Date(endDate) - +new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  // Effect para actualizar el countdown cada segundo
  useEffect(() => {
    if (challenge && challenge.status === 'ACTIVE') {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(challenge.endDate))
      }, 1000)

      // Calcular tiempo inicial
      setTimeLeft(calculateTimeLeft(challenge.endDate))

      return () => clearInterval(timer)
    }
  }, [challenge])

  const fetchChallengeDetail = async () => {
    console.log('🔄 Iniciando fetchChallengeDetail para ID:', id)
    
    // Datos de fallback por defecto
    const fallbackChallenge = {
      id: parseInt(id),
      title: "Desarrollo de API REST con Node.js",
      companyName: "TechCorp",
      description: "Desarrollar una API REST completa para un sistema de gestión de inventarios. La API debe incluir autenticación JWT, CRUD operations para productos, categorías y proveedores, validación de datos, manejo de errores y documentación con Swagger.",
      startDate: "2026-01-15",
      endDate: "2026-02-15",
      status: "ACTIVE",
      areaTecnologica: "Backend",
      nivelSeniority: "Semi Senior",
      tipoReto: "api-backend",
      criteriosEvaluacion: "Se evaluará la calidad del código, arquitectura, implementación de seguridad, testing unitario, documentación y performance de la API.",
      areaEvaluacion: "Node.js",
      metricasEvaluacion: ["Performance", "Casos de prueba", "Similitud de código"],
      repositorioBase: "https://github.com/techcorp/inventory-api-base",
      enlaces: "https://docs.techcorp.com/api-guidelines",
      premio: "$1500",
      tipoPremio: "dinero",
      descripcionPremio: "Primer lugar: $1500, Segundo lugar: $800, Tercer lugar: $400",
      numeroGanadores: 3,
      visibilidad: "publico",
      recursos: [
        { nombre: "API Guidelines.pdf", tipo: "pdf", url: "#" },
        { nombre: "Database Schema.sql", tipo: "sql", url: "#" },
        { nombre: "Postman Collection.json", tipo: "json", url: "#" }
      ],
      participantes: 45,
      estado: "activo",
      tiempoRestante: "15 días"
    }

    try {
      setLoading(true)
      setError('')
      console.log('📡 Intentando obtener datos de la API...')
      
      // Intentar obtener datos de la API de challenges
      const allChallenges = await fetchChallenges()
      console.log('✅ API Response recibida:', allChallenges)
      
      const apiChallenge = allChallenges.find(challenge => challenge.id == id)
      console.log('🔍 Challenge encontrado para ID', id, ':', apiChallenge)
      
      if (apiChallenge) {
        // Combinar datos de API con fallback (API tiene prioridad, fallback como default)
        const combinedChallenge = {
          ...fallbackChallenge, // Valores por defecto
          ...apiChallenge,      // Datos de la API (sobrescriben los defaults si existen)
          // Mapear algunos campos específicos para compatibilidad
          titulo: apiChallenge.title || fallbackChallenge.title,
          empresa: apiChallenge.companyName || fallbackChallenge.companyName,
          descripcion: apiChallenge.description || fallbackChallenge.description,
          fechaInicio: apiChallenge.startDate || fallbackChallenge.startDate,
          fechaFin: apiChallenge.endDate || fallbackChallenge.endDate,
          estado: apiChallenge.status === 'ACTIVE' ? 'activo' : 
                  apiChallenge.status === 'COMPLETED' ? 'finalizado' : 'activo'
        }
        
        console.log('✅ Challenge combinado final:', combinedChallenge)
        setChallenge(combinedChallenge)
      } else {
        // Si no se encuentra en la API, usar datos de fallback
        console.warn('⚠️ Challenge con ID', id, 'no encontrado en la API, usando datos de fallback')
        setChallenge(fallbackChallenge)
      }
      
    } catch (error) {
      console.error('❌ Error loading challenge:', error)
      console.log('🔄 Usando datos de fallback debido al error')
      setError('Error al cargar el reto desde la API, mostrando datos de ejemplo.')
      
      // En caso de error, usar datos de fallback
      setChallenge(fallbackChallenge)
    } finally {
      console.log('🏁 fetchChallengeDetail completado, setLoading(false)')
      setLoading(false)
    }
  }

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto mb-4"></div>
          <p className="text-primary-700">Cargando reto...</p>
        </div>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-primary-900 mb-2">Error</h2>
          <p className="text-primary-700 mb-4">{error || 'Reto no encontrado'}</p>
          <Button onClick={() => navigate('/retos')} variant="primary">
            Volver a retos
          </Button>
        </div>
      </div>
    )
  }

  // Renderizar según el rol del usuario
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/retos')}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a retos
          </button>
        </div>

        {userRole === 'COMPANY' ? (
          <CompanyChallengeView 
            challenge={getMappedChallenge()} 
            timeLeft={timeLeft}
          />
        ) : (
          <StudentChallengeView 
            challenge={getMappedChallenge()} 
            timeLeft={timeLeft}
          />
        )}
      </div>
    </div>
  )
}