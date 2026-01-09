import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components'

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [challenge, setChallenge] = useState(null)
  const [error, setError] = useState('')
  
  // Estado para la subida de solución
  const [solutionData, setSolutionData] = useState({
    repositoryUrl: '',
    description: '',
    comments: ''
  })
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchChallengeDetail()
  }, [id])

  const fetchChallengeDetail = async () => {
    try {
      setLoading(true)
      // Simulación de datos del reto - aquí iría la llamada real al API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockChallenge = {
        id: id,
        titulo: "Desarrollo de API REST con Node.js",
        empresa: "TechCorp",
        areaTecnologica: "Backend",
        nivelSeniority: "Semi Senior",
        fechaInicio: "2024-01-15",
        fechaFin: "2024-02-15",
        tipoReto: "api-backend",
        descripcion: "Desarrollar una API REST completa para un sistema de gestión de inventarios. La API debe incluir autenticación JWT, CRUD operations para productos, categorías y proveedores, validación de datos, manejo de errores y documentación con Swagger.",
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
        estado: "activo", // activo, finalizado, proximamente
        tiempoRestante: "15 días"
      }
      
      setChallenge(mockChallenge)
    } catch (err) {
      setError('Error al cargar el reto')
    } finally {
      setLoading(false)
    }
  }

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

  const handleSubmitSolution = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Aquí iría la lógica para enviar la solución al backend
      console.log('Solución enviada:', {
        challengeId: id,
        solutionData,
        files: uploadedFiles
      })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mostrar mensaje de éxito y limpiar formulario
      alert('¡Solución enviada exitosamente!')
      setSolutionData({ repositoryUrl: '', description: '', comments: '' })
      setUploadedFiles([])
      
    } catch (err) {
      setError('Error al enviar la solución')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-500 mx-auto mb-4"></div>
          <p className="text-primary-700">Cargando reto...</p>
        </div>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-primary-700 mb-4">{error || 'Reto no encontrado'}</p>
          <Button onClick={() => navigate('/retos')} variant="primary">
            Volver a retos
          </Button>
        </div>
      </div>
    )
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información principal del reto */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header del reto */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-primary-900 mb-2">
                    {challenge.titulo}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-primary-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 011-1h4a2 2 0 011 1v12" />
                      </svg>
                      {challenge.empresa}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {challenge.areaTecnologica}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {challenge.nivelSeniority}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      {challenge.participantes} participantes
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    challenge.estado === 'activo' 
                      ? 'bg-green-100 text-green-800' 
                      : challenge.estado === 'finalizado'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {challenge.estado === 'activo' ? '🟢 Activo' : 
                     challenge.estado === 'finalizado' ? '⚫ Finalizado' : '🔵 Próximamente'}
                  </span>
                  {challenge.estado === 'activo' && (
                    <span className="text-sm text-primary-600">
                      ⏰ {challenge.tiempoRestante} restantes
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="text-sm text-primary-600 mb-1">Fecha inicio</div>
                  <div className="font-semibold text-primary-900">
                    {new Date(challenge.fechaInicio).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="text-sm text-primary-600 mb-1">Fecha fin</div>
                  <div className="font-semibold text-primary-900">
                    {new Date(challenge.fechaFin).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="text-sm text-primary-600 mb-1">Premio</div>
                  <div className="font-semibold text-primary-900">{challenge.premio}</div>
                </div>
              </div>
            </div>

            {/* Descripción del reto */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                📋 Descripción del Reto
              </h2>
              <div className="prose prose-primary max-w-none">
                <p className="text-primary-700 leading-relaxed mb-4">
                  {challenge.descripcion}
                </p>
              </div>
            </div>

            {/* Criterios de evaluación */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                ✅ Criterios de Evaluación
              </h2>
              <p className="text-primary-700 leading-relaxed mb-4">
                {challenge.criteriosEvaluacion}
              </p>
              
              {challenge.metricasEvaluacion.length > 0 && (
                <div>
                  <h3 className="font-medium text-primary-900 mb-3">Métricas específicas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {challenge.metricasEvaluacion.map((metrica, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {metrica}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recursos y enlaces */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                📚 Recursos y Enlaces
              </h2>
              
              <div className="space-y-4">
                {challenge.repositorioBase && (
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">Repositorio base:</h3>
                    <a 
                      href={challenge.repositorioBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {challenge.repositorioBase}
                    </a>
                  </div>
                )}

                {challenge.enlaces && (
                  <div>
                    <h3 className="font-medium text-primary-900 mb-2">Enlaces adicionales:</h3>
                    <a 
                      href={challenge.enlaces}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Documentación
                    </a>
                  </div>
                )}

                {challenge.recursos && challenge.recursos.length > 0 && (
                  <div>
                    <h3 className="font-medium text-primary-900 mb-3">Archivos de recursos:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {challenge.recursos.map((recurso, index) => (
                        <a
                          key={index}
                          href={recurso.url}
                          className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-secondary-100 rounded flex items-center justify-center">
                            📄
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-primary-900 truncate">
                              {recurso.nombre}
                            </div>
                            <div className="text-sm text-primary-600 uppercase">
                              {recurso.tipo}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Premios */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                🏆 Premios y Reconocimientos
              </h2>
              <div className="bg-linear-to-r from-secondary-50 to-secondary-100 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900">{challenge.premio}</div>
                    <div className="text-sm text-primary-600">{challenge.tipoPremio}</div>
                  </div>
                </div>
                <p className="text-primary-700">{challenge.descripcionPremio}</p>
                <div className="mt-3 text-sm text-primary-600">
                  👥 {challenge.numeroGanadores} ganadores
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral - Subir solución */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-4">
                  🚀 Subir tu Solución
                </h2>
                
                {challenge.estado === 'activo' ? (
                  <form onSubmit={handleSubmitSolution} className="space-y-4">
                    <div>
                      <label htmlFor="repositoryUrl" className="block text-sm font-medium text-primary-700 mb-2">
                        URL del Repositorio *
                      </label>
                      <input
                        id="repositoryUrl"
                        name="repositoryUrl"
                        type="url"
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm"
                        placeholder="https://github.com/tu-usuario/repo"
                        value={solutionData.repositoryUrl}
                        onChange={handleSolutionInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-2">
                        Descripción de la solución *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm resize-none"
                        placeholder="Describe tu enfoque y solución..."
                        value={solutionData.description}
                        onChange={handleSolutionInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Archivos adicionales
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
                          onChange={handleFileInput}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        <div className="space-y-2">
                          <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary-900">Sube archivos</p>
                            <p className="text-xs text-primary-600">Documentos, capturas, etc.</p>
                          </div>
                        </div>
                      </div>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-neutral-50 rounded p-2">
                              <span className="text-xs text-primary-900 truncate">{file.name}</span>
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
                      <label htmlFor="comments" className="block text-sm font-medium text-primary-700 mb-2">
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
        </div>
      </div>
    </div>
  )
}