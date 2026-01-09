import React, { useState, useEffect } from 'react'
import { ChallengeCard, Button } from '../../shared/components'
import { fetchChallenges } from '../services'

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  // Cargar challenges desde la API
  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchChallenges()
      setChallenges(data)
    } catch (error) {
      console.error('Error loading challenges:', error)
      setError('Error al cargar los retos. Por favor, intenta de nuevo.')
      
      // Fallback: usar datos de ejemplo si falla la API
      const sampleChallenges = [
        {
          id: 1,
          title: "Desarrollador Frontend React",
          companyName: "TechCorp",
          description: "Buscamos desarrollador con experiencia en React y TypeScript para proyecto innovador de plataforma web.",
          status: "ACTIVE",
          startDate: "2026-01-09",
          endDate: "2026-03-09"
        },
        {
          id: 2,
          title: "Diseñador UX/UI",
          companyName: "StartupXYZ", 
          description: "Únete a nuestro equipo para crear experiencias digitales excepcionales en productos SaaS.",
          status: "ACTIVE",
          startDate: "2026-01-09",
          endDate: "2026-07-09"
        },
        {
          id: 3,
          title: "Desarrollador Backend Python",
          companyName: "DataFlow Inc",
          description: "Desarrollo de APIs y microservicios para plataforma de análisis de datos en tiempo real.",
          status: "ACTIVE", 
          startDate: "2026-01-09",
          endDate: "2026-05-09"
        }
      ]
      setChallenges(sampleChallenges)
    } finally {
      setLoading(false)
    }
  }


  const filteredChallenges = challenges.filter(challenge => {
    // Filtro por status
    const matchesFilter = filter === 'todos' || challenge.status === filter
    
    // Filtro por búsqueda (título, empresa)
    const matchesSearch = searchTerm === '' || 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const filterOptions = [
    { value: 'todos', label: 'Todos los retos' },
    { value: 'ACTIVE', label: 'Activos' },
    { value: 'INACTIVE', label: 'Inactivos' },
    { value: 'COMPLETED', label: 'Completados' }
  ]

  // Mostrar mensaje de error si hay uno
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <Button onClick={loadChallenges} variant="primary">
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-500 mx-auto mb-4"></div>
              <p className="text-primary-700">Cargando retos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-900 mb-4  mx-6 lg:mx-12">
            Participa de los retos y aprende lo que el <span className='text-secondary-500'>Mercado Tecnológico Necesita </span> 
          </h1>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Muchas veces lo aprendido a clases ya no es suficiente, atrévete a aprender con proyectos reales de la industria.
          </p>
        </div>

        {/* Campo de búsqueda */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <span className="text-lg font-semibold text-primary-900">Buscar:</span>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar por título, empresa o tecnologías..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent shadow-sm text-primary-900 placeholder-neutral-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {searchTerm && (
              <div className="mt-2 ml-20 text-sm text-primary-600">
                Buscando: "<span className="font-semibold text-primary-900">{searchTerm}</span>" 
                {filteredChallenges.length > 0 && (
                  <span className="ml-2">- {filteredChallenges.length} resultado(s) encontrado(s)</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <span className="text-lg font-semibold text-primary-900">Filtrar:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      filter === option.value
                        ? 'bg-secondary-500 text-primary-900'
                        : 'bg-white text-primary-700 hover:bg-secondary-100 border border-neutral-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-secondary-500 mb-2">
              {challenges.length}
            </div>
            <div className="text-sm text-primary-700">Retos Activos</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-secondary-500 mb-2">
              {challenges.filter(c => c.opportunityType === 'Contratación').length}
            </div>
            <div className="text-sm text-primary-700">Contrataciones</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-secondary-500 mb-2">
              {challenges.filter(c => c.opportunityType === 'Pasantía').length}
            </div>
            <div className="text-sm text-primary-700">Pasantías</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-secondary-500 mb-2">
              {challenges.filter(c => c.opportunityType === 'Prácticas').length}
            </div>
            <div className="text-sm text-primary-700">Prácticas</div>
          </div>
        </div>

        {/* Lista de retos */}
        {filteredChallenges.length > 0 ? (
          <div className="space-y-6">
            {filteredChallenges.map(challenge => {
              // Transformar los datos para que coincidan con lo que espera ChallengeCard
              const challengeForCard = {
                id: challenge.id,
                company: challenge.company,
                title: challenge.title,
                description: challenge.description,
                category: challenge.difficulty || 'General', // Usar difficulty como category
                technology: challenge.technologies ? challenge.technologies.join(', ') : '', // Convertir array a string
                prize: challenge.price,
                opportunityType: challenge.opportunityType,
                icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>' // Icono por defecto
              }
              
              return (
                <ChallengeCard
                  key={challenge.id || challenge.title}
                  challenge={challengeForCard}
                  variant="list"
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 0a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-700 mb-2">
              No hay retos disponibles
            </h3>
            <p className="text-primary-600 mb-6">
              {searchTerm 
                ? `No encontramos retos que coincidan con "${searchTerm}" y los filtros seleccionados.`
                : 'No encontramos retos que coincidan con los filtros seleccionados.'
              }
            </p>
            <div className="space-x-3">
              {searchTerm && (
                <Button 
                  onClick={() => setSearchTerm('')}
                  variant="neutral"
                >
                  Limpiar búsqueda
                </Button>
              )}
              <Button 
                onClick={() => {
                  setFilter('todos')
                  setSearchTerm('')
                }}
                variant="primary"
              >
                Ver todos los retos
              </Button>
            </div>
          </div>
        )}

        {/* Call to action 
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              ¿Tienes un reto para publicar?
            </h3>
            <p className="text-primary-700 mb-6">
              Conecta con talento joven y encuentra a los mejores candidatos para tu empresa.
            </p>
            <Button 
              to="/retos/publicar"
              variant="secondary"
              size="large"
            >
              Publica tu Reto
            </Button>
          </div>
        </div>*/}
      </div>
    </div>
  )
}