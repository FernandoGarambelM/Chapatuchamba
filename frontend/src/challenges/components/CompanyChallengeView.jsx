import { useState } from 'react'
import { Button } from '../../shared/components'

export default function CompanyChallengeView({ challenge, timeLeft }) {
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [activeTab, setActiveTab] = useState('participants')

  // Datos de prueba de participantes
  const participantsData = [
    {
      id: 1,
      name: "Ana García López",
      email: "ana.garcia@email.com",
      avatar: "AG",
      university: "Universidad Nacional de Ingeniería",
      career: "Ingeniería de Sistemas",
      score: 95,
      submissionDate: "2026-01-08T14:30:00",
      repositoryUrl: "https://github.com/anagarcia/inventory-api-solution",
      description: "Implementé una API REST completa usando Node.js y Express con autenticación JWT, validación de datos con Joi, y documentación completa con Swagger. La base de datos usa MongoDB con Mongoose para el ORM.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
      files: ["documentation.pdf", "architecture-diagram.png"],
      comments: "He incluido tests unitarios y de integración con Jest. También implementé rate limiting y logging con Winston."
    },
    {
      id: 2,
      name: "Carlos Mendoza Rivera",
      email: "carlos.mendoza@email.com",
      avatar: "CM",
      university: "Universidad de San Marcos",
      career: "Ingeniería de Software",
      score: 88,
      submissionDate: "2026-01-07T09:15:00",
      repositoryUrl: "https://github.com/carlosmendoza/node-inventory-api",
      description: "Desarrollé la API usando TypeScript con Node.js, PostgreSQL como base de datos y Prisma como ORM. Implementé autenticación con Passport.js y validación con class-validator.",
      technologies: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Passport.js"],
      files: ["postman-collection.json"],
      comments: "La API incluye paginación, filtros avanzados y un sistema de logs detallado."
    },
    {
      id: 3,
      name: "María Fernanda Quispe",
      email: "maria.quispe@email.com",
      avatar: "MQ",
      university: "Universidad Católica San Pablo",
      career: "Ingeniería Informática",
      score: 82,
      submissionDate: "2026-01-06T16:45:00",
      repositoryUrl: "https://github.com/mariaquispe/inventory-rest-api",
      description: "Construí la API con NestJS utilizando el patrón de arquitectura hexagonal. Base de datos MySQL con TypeORM, autenticación JWT y documentación automática con Swagger.",
      technologies: ["NestJS", "MySQL", "TypeORM", "JWT", "Swagger"],
      files: ["api-testing-results.pdf", "performance-report.xlsx"],
      comments: "Implementé caché con Redis para mejorar el rendimiento y middleware personalizado para auditoría."
    },
    {
      id: 4,
      name: "Diego Martínez Torres",
      email: "diego.martinez@email.com",
      avatar: "DT",
      university: "Universidad Nacional del Altiplano",
      career: "Ingeniería de Sistemas",
      score: 76,
      submissionDate: "2026-01-05T11:20:00",
      repositoryUrl: "https://github.com/diegomartinez/simple-inventory-api",
      description: "API desarrollada con Express.js básico, autenticación simple con JWT y base de datos SQLite para simplicidad. Enfoque en funcionalidad core sin características avanzadas.",
      technologies: ["Express.js", "SQLite", "JWT", "Node.js"],
      files: [],
      comments: "Solución minimalista pero funcional que cubre todos los requisitos básicos."
    },
    {
      id: 5,
      name: "Lucía Condori Mamani",
      email: "lucia.condori@email.com",
      avatar: "LC",
      university: "Universidad Peruana Unión",
      career: "Ingeniería de Software",
      score: 91,
      submissionDate: "2026-01-04T13:10:00",
      repositoryUrl: "https://github.com/luciacondori/advanced-inventory-api",
      description: "API robusta con microservicios usando Node.js y Docker. Implementé CQRS con EventSourcing, autenticación OAuth2, y CI/CD con GitHub Actions. Base de datos distribuida con MongoDB y Redis.",
      technologies: ["Node.js", "Docker", "MongoDB", "Redis", "OAuth2", "CQRS"],
      files: ["docker-compose.yml", "architecture-overview.pdf", "deployment-guide.md"],
      comments: "Incluí monitoreo con Prometheus y Grafana, así como documentación completa del diseño arquitectónico."
    }
  ]

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreIcon = (score) => {
    if (score >= 90) return '🥇'
    if (score >= 80) return '🥈'
    if (score >= 70) return '🥉'
    return '📊'
  }

  if (!challenge) {
    return <div>Cargando...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda: Información del reto */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          {/* Header del reto */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  challenge.estado === 'activo' 
                    ? 'bg-green-100 text-green-700'
                    : challenge.estado === 'finalizado'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {challenge.estado === 'activo' ? '🔴 En vivo' : 
                   challenge.estado === 'finalizado' ? '✅ Finalizado' : '⏳ Próximamente'}
                </span>
                <span className="text-sm text-primary-600">{challenge.areaTecnologica || challenge.area || 'Backend'}</span>
                <span className="text-sm text-primary-600">•</span>
                <span className="text-sm text-primary-600">{challenge.nivelSeniority || challenge.nivel || 'Semi Senior'}</span>
              </div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                {challenge.titulo}
              </h1>
              <p className="text-primary-700">
                Por <span className="font-medium">{challenge.empresa}</span>
              </p>
            </div>
            
            {/* Badge de empresa */}
            <div className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium">
              👔 Vista de Empresa
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="border-b border-neutral-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('participants')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'participants'
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                👥 Participantes ({participantsData.length})
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                📋 Detalles del Reto
              </button>
            </nav>
          </div>

          {/* Contenido de las tabs */}
          {activeTab === 'participants' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary-900">Lista de Participantes</h2>
                <div className="text-sm text-primary-600">
                  Ordenados por puntaje (mayor a menor)
                </div>
              </div>

              {/* Lista de participantes */}
              <div className="space-y-3">
                {participantsData.sort((a, b) => b.score - a.score).map((participant, index) => (
                  <div
                    key={participant.id}
                    className="bg-neutral-50 rounded-lg p-4 hover:bg-neutral-100 transition-colors cursor-pointer"
                    onClick={() => setSelectedParticipant(participant)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {index === 0 && '🥇'}
                            {index === 1 && '🥈'}
                            {index === 2 && '🥉'}
                            {index > 2 && `#${index + 1}`}
                          </span>
                          <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center text-primary-900 font-semibold">
                            {participant.avatar}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-primary-900">{participant.name}</h3>
                          <p className="text-sm text-primary-600">{participant.university}</p>
                          <p className="text-xs text-primary-500">{participant.career}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(participant.score)}`}>
                            <span>{getScoreIcon(participant.score)}</span>
                            <span>{participant.score}/100</span>
                          </div>
                          <p className="text-xs text-primary-600 mt-1">
                            {new Date(participant.submissionDate).toLocaleDateString('es-ES', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Vista previa de tecnologías */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {participant.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-white text-primary-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {participant.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white text-primary-500 rounded text-xs">
                          +{participant.technologies.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Descripción */}
              <div>
                <h2 className="text-xl font-semibold text-primary-900 mb-4">Descripción del Reto</h2>
                <div className="prose prose-sm max-w-none text-primary-700">
                  <p>{challenge.descripcion}</p>
                </div>
              </div>

              {/* Criterios de evaluación */}
              {challenge.criteriosEvaluacion && (
                <div>
                  <h2 className="text-xl font-semibold text-primary-900 mb-4">Criterios de Evaluación</h2>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-primary-700">{challenge.criteriosEvaluacion}</p>
                  </div>
                </div>
              )}

              {/* Métricas de evaluación */}
              {challenge.metricasEvaluacion && challenge.metricasEvaluacion.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-primary-900 mb-4">Métricas de Evaluación</h2>
                  <div className="flex flex-wrap gap-2">
                    {challenge.metricasEvaluacion.map((metrica, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium"
                      >
                        {metrica}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recursos adicionales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.repositorioBase && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-medium text-primary-900 mb-2">📁 Repositorio Base</h3>
                    <a 
                      href={challenge.repositorioBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-600 hover:text-secondary-700 text-sm underline break-all"
                    >
                      {challenge.repositorioBase}
                    </a>
                  </div>
                )}

                {challenge.enlaces && (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-medium text-primary-900 mb-2">🔗 Enlaces Adicionales</h3>
                    <a 
                      href={challenge.enlaces}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-600 hover:text-secondary-700 text-sm underline break-all"
                    >
                      {challenge.enlaces}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha: Información de tiempo y estadísticas */}
      <div className="lg:col-span-1">
        {/* Countdown timer */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-4">⏱️ Tiempo Restante</h2>
          
          {challenge.estado === 'activo' ? (
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-900">{timeLeft.days}</div>
                <div className="text-xs text-primary-600">Días</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-900">{timeLeft.hours}</div>
                <div className="text-xs text-primary-600">Horas</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-900">{timeLeft.minutes}</div>
                <div className="text-xs text-primary-600">Minutos</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-900">{timeLeft.seconds}</div>
                <div className="text-xs text-primary-600">Segundos</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">
                {challenge.estado === 'finalizado' ? '⏰' : '🚀'}
              </div>
              <p className="text-primary-700 text-sm">
                {challenge.estado === 'finalizado' 
                  ? 'Reto finalizado' 
                  : 'Reto próximamente'}
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="text-sm text-primary-600 space-y-1">
              <div className="flex justify-between">
                <span>Inicio:</span>
                <span className="font-medium">
                  {new Date(challenge.fechaInicio).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fin:</span>
                <span className="font-medium">
                  {new Date(challenge.fechaFin).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas del reto */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-4">📊 Estadísticas</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary-600">Total Participantes</span>
              <span className="font-semibold text-primary-900">{participantsData.length}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary-600">Puntaje Promedio</span>
              <span className="font-semibold text-primary-900">
                {Math.round(participantsData.reduce((acc, p) => acc + p.score, 0) / participantsData.length)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary-600">Mejor Puntaje</span>
              <span className="font-semibold text-green-600">
                {Math.max(...participantsData.map(p => p.score))} 🥇
              </span>
            </div>
            
            <div className="pt-2 border-t border-neutral-200">
              <div className="text-sm text-primary-600 mb-2">Distribución de Tecnologías</div>
              <div className="flex flex-wrap gap-1">
                {Array.from(new Set(participantsData.flatMap(p => p.technologies)))
                  .slice(0, 4)
                  .map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded text-xs">
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones de la empresa */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-4">🔧 Acciones</h2>
          
          <div className="space-y-3">
            <Button 
              variant="primary" 
              size="medium" 
              className="w-full"
              onClick={() => alert('Exportando datos de participantes...')}
            >
              📊 Exportar Datos
            </Button>
            
            <Button 
              variant="secondary" 
              size="medium" 
              className="w-full"
              onClick={() => alert('Enviando notificaciones...')}
            >
              📧 Notificar Participantes
            </Button>
            
            <Button 
              variant="neutral" 
              size="medium" 
              className="w-full"
              onClick={() => alert('Configurando evaluación automática...')}
            >
              ⚙️ Configurar Evaluación
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de detalle del participante */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-primary-900 font-semibold text-lg">
                    {selectedParticipant.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-primary-900">{selectedParticipant.name}</h2>
                    <p className="text-primary-600">{selectedParticipant.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Información académica y puntaje */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">🎓 Información Académica</h3>
                    <p className="text-sm text-primary-700">{selectedParticipant.university}</p>
                    <p className="text-sm text-primary-600">{selectedParticipant.career}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">📊 Evaluación</h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(selectedParticipant.score)}`}>
                      <span className="text-lg">{getScoreIcon(selectedParticipant.score)}</span>
                      <span className="font-semibold">{selectedParticipant.score}/100 puntos</span>
                    </div>
                  </div>
                </div>

                {/* Repositorio */}
                <div>
                  <h3 className="font-medium text-primary-900 mb-2">💻 Repositorio</h3>
                  <a 
                    href={selectedParticipant.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-600 hover:text-secondary-700 underline break-all"
                  >
                    {selectedParticipant.repositoryUrl}
                  </a>
                </div>

                {/* Descripción de la solución */}
                <div>
                  <h3 className="font-medium text-primary-900 mb-2">📝 Descripción de la Solución</h3>
                  <p className="text-primary-700 bg-neutral-50 rounded-lg p-3">
                    {selectedParticipant.description}
                  </p>
                </div>

                {/* Tecnologías utilizadas */}
                <div>
                  <h3 className="font-medium text-primary-900 mb-2">🛠️ Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedParticipant.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Archivos adjuntos */}
                {selectedParticipant.files.length > 0 && (
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">📎 Archivos Adjuntos</h3>
                    <div className="space-y-2">
                      {selectedParticipant.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-neutral-50 rounded-lg p-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-primary-700">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comentarios */}
                {selectedParticipant.comments && (
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">💭 Comentarios Adicionales</h3>
                    <p className="text-primary-700 bg-neutral-50 rounded-lg p-3 italic">
                      "{selectedParticipant.comments}"
                    </p>
                  </div>
                )}

                {/* Información de envío */}
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Fecha de envío:</span>
                    <span className="text-primary-900 font-medium">
                      {new Date(selectedParticipant.submissionDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}