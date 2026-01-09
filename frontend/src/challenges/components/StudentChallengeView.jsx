import { useState } from 'react'
import { Button } from '../../shared/components'

export default function StudentChallengeView({ challenge, timeLeft }) {
  // Estado para detectar si ya participó en el reto
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [userPosition, setUserPosition] = useState(null)
  
  // Estado para la subida de solución
  const [solutionData, setSolutionData] = useState({
    repositoryUrl: '',
    description: '',
    comments: ''
  })
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Datos mock para el ranking
  const rankingData = [
    { 
      id: 1, 
      position: 1,
      name: "María García López", 
      university: "Universidad Nacional Mayor de San Marcos", 
      score: 95,
      avatar: "🥇",
      technologies: ["React", "Node.js", "MongoDB"],
      submittedAt: "2026-01-08",
      isCurrentUser: false
    },
    { 
      id: 2, 
      position: 2,
      name: "Carlos Mendoza Ruiz", 
      university: "Pontificia Universidad Católica del Perú", 
      score: 88,
      avatar: "🥈",
      technologies: ["Vue.js", "Python", "PostgreSQL"],
      submittedAt: "2026-01-07",
      isCurrentUser: false
    },
    { 
      id: 3, 
      position: 3,
      name: "Ana Sofía Herrera", 
      university: "Universidad de Lima", 
      score: 82,
      avatar: "🥉",
      technologies: ["Angular", "Java", "MySQL"],
      submittedAt: "2026-01-06",
      isCurrentUser: false
    },
    { 
      id: 4, 
      position: 4,
      name: "Luis Fernando Torres", 
      university: "Universidad Nacional de Ingeniería", 
      score: 79,
      avatar: "👨‍💻",
      technologies: ["React", "Laravel", "Redis"],
      submittedAt: "2026-01-08",
      isCurrentUser: false
    },
    { 
      id: 5, 
      position: 5,
      name: "Tú", 
      university: "Universidad Nacional de San Agustín", 
      score: 76,
      avatar: "👤",
      technologies: ["React", "Spring Boot", "PostgreSQL"],
      submittedAt: "2026-01-09",
      isCurrentUser: true
    },
    { 
      id: 6, 
      position: 6,
      name: "Sofía Ramírez Castro", 
      university: "Universidad San Martín de Porres", 
      score: 73,
      avatar: "👩‍💻",
      technologies: ["Vue.js", "Django", "SQLite"],
      submittedAt: "2026-01-05",
      isCurrentUser: false
    },
    { 
      id: 7, 
      position: 7,
      name: "Diego Alejandro Vega", 
      university: "Universidad Peruana de Ciencias Aplicadas", 
      score: 70,
      avatar: "🧑‍💻",
      technologies: ["Angular", "Express.js", "MongoDB"],
      submittedAt: "2026-01-04",
      isCurrentUser: false
    }
  ]

  // Obtener el usuario actual y los primeros 3 lugares
  const currentUser = rankingData.find(user => user.isCurrentUser)
  const podiumUsers = rankingData.slice(0, 3)

  const handleSolutionInputChange = (e) => {
    const { name, value } = e.target
    setSolutionData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSolutionSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      console.log('Solución enviada:', {
        challengeId: challenge.id,
        solutionData,
        files: uploadedFiles
      })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Cambiar el estado a "participó" después del envío exitoso
      setHasSubmitted(true)
      setUserPosition(5) // Posición del usuario en el ranking mock
      
      alert('¡Solución enviada exitosamente!')
      setSolutionData({ repositoryUrl: '', description: '', comments: '' })
      setUploadedFiles([])
      
    } catch (err) {
      console.error('Error al enviar la solución:', err)
      alert('Error al enviar la solución')
    } finally {
      setSubmitting(false)
    }
  }

  if (!challenge) {
    return <div>Cargando...</div>
  }

  // Vista de ranking si el usuario ya participó
  if (hasSubmitted) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header de felicitación */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            ¡Gracias por participar!
          </h1>
          <p className="text-lg text-primary-700 mb-2">
            Tu solución ha sido enviada exitosamente
          </p>
          <div className="flex items-center justify-center gap-2 text-primary-600">
            <span className="font-semibold">Tu posición actual:</span>
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-bold">
              #{currentUser?.position || 5}
            </span>
          </div>
        </div>

        {/* Podio */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">🏆 Podio de Líderes</h2>
          
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* Segundo lugar */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-lg p-6 mb-4" style={{height: '120px'}}>
                <div className="text-4xl mb-2">🥈</div>
                <div className="text-lg font-bold text-gray-800">{podiumUsers[1]?.name}</div>
                <div className="text-sm text-gray-600">{podiumUsers[1]?.university}</div>
                <div className="text-2xl font-bold text-gray-700 mt-2">{podiumUsers[1]?.score} pts</div>
              </div>
              <div className="bg-gray-400 text-white py-2 px-4 rounded font-semibold">2°</div>
            </div>

            {/* Primer lugar */}
            <div className="text-center">
              <div className="bg-yellow-100 rounded-lg p-6 mb-4" style={{height: '160px'}}>
                <div className="text-5xl mb-2">🥇</div>
                <div className="text-xl font-bold text-yellow-800">{podiumUsers[0]?.name}</div>
                <div className="text-sm text-yellow-700">{podiumUsers[0]?.university}</div>
                <div className="text-3xl font-bold text-yellow-800 mt-2">{podiumUsers[0]?.score} pts</div>
              </div>
              <div className="bg-yellow-500 text-white py-3 px-6 rounded font-bold text-lg">1°</div>
            </div>

            {/* Tercer lugar */}
            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-6 mb-4" style={{height: '100px'}}>
                <div className="text-3xl mb-2">🥉</div>
                <div className="text-lg font-bold text-orange-800">{podiumUsers[2]?.name}</div>
                <div className="text-sm text-orange-600">{podiumUsers[2]?.university}</div>
                <div className="text-xl font-bold text-orange-700 mt-2">{podiumUsers[2]?.score} pts</div>
              </div>
              <div className="bg-orange-500 text-white py-2 px-4 rounded font-semibold">3°</div>
            </div>
          </div>
        </div>

        {/* Tabla de ranking completo */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">📊 Ranking Completo</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Posición</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Participante</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Universidad</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Tecnologías</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Puntaje</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary-900">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((participant) => (
                  <tr 
                    key={participant.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      participant.isCurrentUser ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{participant.avatar}</span>
                        <span className={`font-bold ${
                          participant.position <= 3 ? 'text-yellow-600' : 
                          participant.isCurrentUser ? 'text-primary-700' : 'text-gray-700'
                        }`}>
                          #{participant.position}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`font-semibold ${
                        participant.isCurrentUser ? 'text-primary-800' : 'text-gray-900'
                      }`}>
                        {participant.name}
                        {participant.isCurrentUser && (
                          <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                            Tu posición
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {participant.university}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {participant.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-bold text-lg ${
                        participant.position <= 3 ? 'text-yellow-600' : 
                        participant.isCurrentUser ? 'text-primary-700' : 'text-gray-700'
                      }`}>
                        {participant.score} pts
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {new Date(participant.submittedAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="bg-linear-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mt-8 text-center">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            ¡Excelente trabajo!
          </h3>
          <p className="text-primary-700 text-lg mb-6">
            Tu solución está siendo evaluada por nuestro equipo de expertos. 
            Los resultados finales se anunciarán cuando termine el reto.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => setHasSubmitted(false)}>
              Ver detalles del reto
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/retos'}>
              Explorar más retos
            </Button>
          </div>
        </div>
      </div>
    )
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
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">Descripción del Reto</h2>
            <div className="prose prose-sm max-w-none text-primary-700">
              <p>{challenge.descripcion}</p>
            </div>
          </div>

          {/* Criterios de evaluación */}
          {challenge.criteriosEvaluacion && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Criterios de Evaluación</h2>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-primary-700">{challenge.criteriosEvaluacion}</p>
              </div>
            </div>
          )}

          {/* Métricas de evaluación */}
          {challenge.metricasEvaluacion && challenge.metricasEvaluacion.length > 0 && (
            <div className="mb-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

          {/* Premios */}
          {challenge.premio && (
            <div className="bg-linear-to-r from-secondary-50 to-secondary-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-primary-900">🎁 Premios</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-primary-600 mb-1">Premio Principal</p>
                  <p className="font-medium text-primary-900">{challenge.premio}</p>
                </div>
                
                {challenge.numeroGanadores && (
                  <div>
                    <p className="text-sm text-primary-600 mb-1">Ganadores</p>
                    <p className="font-medium text-primary-900">{challenge.numeroGanadores} plaza(s)</p>
                  </div>
                )}
                
                {challenge.tipoPremio && (
                  <div>
                    <p className="text-sm text-primary-600 mb-1">Tipo</p>
                    <p className="font-medium text-primary-900 capitalize">{challenge.tipoPremio}</p>
                  </div>
                )}
              </div>
              
              {challenge.descripcionPremio && (
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <p className="text-sm text-primary-700">{challenge.descripcionPremio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha: Información de tiempo y envío */}
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

        {/* Área de envío de solución */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-4">📤 Enviar Solución</h2>
          
          {challenge.estado === 'activo' ? (
            <form onSubmit={handleSolutionSubmit} className="space-y-4">
              <div>
                <label htmlFor="repositoryUrl" className="block text-sm font-medium text-primary-700 mb-1">
                  URL del Repositorio *
                </label>
                <input
                  id="repositoryUrl"
                  name="repositoryUrl"
                  type="url"
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm"
                  placeholder="https://github.com/tu-usuario/tu-repo"
                  value={solutionData.repositoryUrl}
                  onChange={handleSolutionInputChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-1">
                  Descripción de la solución *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm resize-none"
                  placeholder="Describe tu solución, tecnologías usadas, arquitectura..."
                  value={solutionData.description}
                  onChange={handleSolutionInputChange}
                />
              </div>

              {/* Drag & Drop para archivos adicionales */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Archivos adicionales (opcional)
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    dragActive 
                      ? 'border-secondary-500 bg-secondary-50' 
                      : 'border-neutral-300 hover:border-secondary-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept=".zip,.pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-1">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-primary-900">Sube archivos</p>
                    <p className="text-xs text-primary-600">Documentación, diagramas, etc.</p>
                  </div>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-2">
                        <span className="text-xs text-primary-900">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-primary-700 mb-1">
                  Comentarios adicionales
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="3"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm resize-none"
                  placeholder="Comentarios opcionales..."
                  value={solutionData.comments}
                  onChange={handleSolutionInputChange}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enviando...
                  </div>
                ) : (
                  'Enviar Solución'
                )}
              </Button>
              
              {/* Botón de prueba temporal */}
              <Button 
                type="button"
                variant="secondary" 
                size="medium"
                className="w-full" 
                onClick={() => setHasSubmitted(true)}
              >
                🧪 Ver Vista de Ranking
              </Button>

              <div className="text-xs text-primary-600 text-center">
                Asegúrate de que tu repositorio sea público o hayas dado acceso a los evaluadores
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-medium text-primary-900 mb-2">
                {challenge.estado === 'finalizado' ? 'Reto Finalizado' : 'Reto Próximamente'}
              </h3>
              <p className="text-sm text-primary-600">
                {challenge.estado === 'finalizado' 
                  ? 'Este reto ya ha finalizado y no se aceptan más soluciones.'
                  : 'Este reto aún no ha comenzado. Vuelve cuando esté activo.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}