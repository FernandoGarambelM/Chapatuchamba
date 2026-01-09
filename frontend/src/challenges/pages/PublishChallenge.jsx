import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/components'
import { createChallenge } from '../services'

export default function PublishChallenge() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)
  
  const [formData, setFormData] = useState({
    titulo: '',
    areaTecnologica: '',
    nivelSeniority: '',
    fechaInicio: '',
    fechaFin: '',
    descripcionReto: '',
    tipoReto: '',
    areaEvaluacion: '',
    metricasEvaluacion: [],
    repositorioBase: '',
    enlaces: '',
    premio: '',
    tipoPremio: '',
    descripcionPremio: '',
    numeroGanadores: '',
    visibilidad: 'publico',
    terminosCondiciones: false
  })

  const [dragActiveEval, setDragActiveEval] = useState(false)
  const [dragActiveRecursos, setDragActiveRecursos] = useState(false)
  const [uploadedFilesEval, setUploadedFilesEval] = useState([])
  const [uploadedFilesRecursos, setUploadedFilesRecursos] = useState([])

  // Verificar autorización al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const role = localStorage.getItem('role')
    
    if (!token) {
      // Si no está logueado, redirigir al login
      navigate('/login')
      return
    }
    
    if (role !== 'COMPANY') {
      // Si no es una empresa, mostrar error y redirigir
      setError('Solo las empresas pueden crear retos. Contacta al administrador si crees que esto es un error.')
      setTimeout(() => {
        navigate('/retos')
      }, 3000)
      return
    }
    
    setCheckingAuth(false)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDrag = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      if (type === 'eval') setDragActiveEval(true)
      else if (type === 'recursos') setDragActiveRecursos(true)
    } else if (e.type === "dragleave") {
      if (type === 'eval') setDragActiveEval(false)
      else if (type === 'recursos') setDragActiveRecursos(false)
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    if (type === 'eval') setDragActiveEval(false)
    else if (type === 'recursos') setDragActiveRecursos(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      if (type === 'eval') {
        setUploadedFilesEval(prev => [...prev, ...files])
      } else if (type === 'recursos') {
        setUploadedFilesRecursos(prev => [...prev, ...files])
      }
    }
  }

  const handleFileInput = (e, type) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (type === 'eval') {
        setUploadedFilesEval(prev => [...prev, ...files])
      } else if (type === 'recursos') {
        setUploadedFilesRecursos(prev => [...prev, ...files])
      }
    }
  }

  const removeFile = (index, type) => {
    if (type === 'eval') {
      setUploadedFilesEval(prev => prev.filter((_, i) => i !== index))
    } else if (type === 'recursos') {
      setUploadedFilesRecursos(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validar que el usuario esté logueado y sea una empresa
      const userId = localStorage.getItem('userId')
      const userRole = localStorage.getItem('role')
      
      if (!userId) {
        throw new Error('Debes iniciar sesión para publicar un reto')
      }
      
      if (userRole !== 'COMPANY') {
        throw new Error('Solo las empresas pueden crear retos')
      }

      // Validar campos requeridos para la API
      if (!formData.titulo.trim()) {
        throw new Error('El título del reto es obligatorio')
      }
      if (!formData.descripcionReto.trim()) {
        throw new Error('La descripción del reto es obligatoria')
      }
      if (!formData.fechaInicio) {
        throw new Error('La fecha de inicio es obligatoria')
      }
      if (!formData.fechaFin) {
        throw new Error('La fecha de fin es obligatoria')
      }
      
      // Validar que la fecha de fin sea posterior a la de inicio
      if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio)) {
        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio')
      }

      // Preparar los datos principales para la API (solo los campos soportados)
      const challengeApiData = {
        title: formData.titulo.trim(),
        description: formData.descripcionReto.trim(),
        startDate: formData.fechaInicio,
        endDate: formData.fechaFin,
        companyId: parseInt(userId) // Agregar ID del usuario que publica
      }

      // Simular guardado de datos adicionales (no soportados por la API actual)
      const additionalData = {
        areaTecnologica: formData.areaTecnologica,
        nivelSeniority: formData.nivelSeniority,
        tipoReto: formData.tipoReto,
        areaEvaluacion: formData.areaEvaluacion,
        metricasEvaluacion: formData.metricasEvaluacion,
        repositorioBase: formData.repositorioBase,
        enlaces: formData.enlaces,
        premio: formData.premio,
        tipoPremio: formData.tipoPremio,
        descripcionPremio: formData.descripcionPremio,
        numeroGanadores: formData.numeroGanadores,
        visibilidad: formData.visibilidad,
        archivosEvaluacion: uploadedFilesEval.map(file => ({
          nombre: file.name,
          tipo: file.type,
          tamaño: file.size
        })),
        archivosRecursos: uploadedFilesRecursos.map(file => ({
          nombre: file.name,
          tipo: file.type,
          tamaño: file.size
        }))
      }

      console.log('📤 Enviando a la API (campos soportados):', challengeApiData)
      console.log('👤 Usuario que publica:', {
        companyId: userId,
        email: localStorage.getItem('email'),
        role: userRole
      })
      console.log('💾 Datos adicionales simulados:', additionalData)
      
      // Enviar solo los datos principales a la API
      const createdChallenge = await createChallenge(challengeApiData)
      console.log('✅ Challenge creado exitosamente:', createdChallenge)
      
      // Simulación de guardado de datos adicionales
      console.log('📋 Simulando guardado de metadatos adicionales...')
      console.log('📁 Simulando subida de archivos:', {
        evaluacion: uploadedFilesEval.length,
        recursos: uploadedFilesRecursos.length
      })
      
      // Simulación de delay para el procesamiento adicional
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('🎉 Todos los datos procesados correctamente')
      
      // Redireccionar al listado de retos después del éxito
      navigate('/retos')
      
    } catch (err) {
      console.error('❌ Error al publicar el reto:', err)
      setError(err.message || 'Error al publicar el reto. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Mostrar pantalla de carga mientras se verifica la autorización
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto mb-4"></div>
          <p className="text-primary-700">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Crear un Nuevo Reto
          </h1>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Diseña un reto desafiante que impulse el aprendizaje y la innovación en tu comunidad tecnológica.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Sección 1: Información básica del reto */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Información Básica</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="titulo" className="block text-sm font-medium text-primary-700 mb-2">
                    Título del reto *
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Ej: Desarrollo de API REST con Node.js"
                    value={formData.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="areaTecnologica" className="block text-sm font-medium text-primary-700 mb-2">
                    Área tecnológica *
                  </label>
                  <select
                    id="areaTecnologica"
                    name="areaTecnologica"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.areaTecnologica}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar área</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="mobile">Mobile</option>
                    <option value="data">Data Science</option>
                    <option value="devops">DevOps</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="nivelSeniority" className="block text-sm font-medium text-primary-700 mb-2">
                    Nivel seniority *
                  </label>
                  <select
                    id="nivelSeniority"
                    name="nivelSeniority"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.nivelSeniority}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar nivel</option>
                    <option value="junior">Junior</option>
                    <option value="semi-senior">Semi Senior</option>
                    <option value="senior">Senior</option>
                    <option value="todos">Todos los niveles</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="fechaInicio" className="block text-sm font-medium text-primary-700 mb-2">
                    Fecha de inicio *
                  </label>
                  <input
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="fechaFin" className="block text-sm font-medium text-primary-700 mb-2">
                    Fecha de fin *
                  </label>
                  <input
                    id="fechaFin"
                    name="fechaFin"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Descripción y criterios */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Descripción y Criterios</h2>
              </div>
              
              <div>
                <label htmlFor="descripcionReto" className="block text-sm font-medium text-primary-700 mb-2">
                  Descripción del reto *
                </label>
                <textarea
                  id="descripcionReto"
                  name="descripcionReto"
                  rows="6"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none"
                  placeholder="Describe detalladamente el reto, objetivos, contexto y lo que se espera que los participantes desarrollen..."
                  value={formData.descripcionReto}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Sección 3: Tipo de reto */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Tipo de Reto</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { id: 'programacion', title: 'Programación', desc: 'Desarrollo de código y algoritmos', icon: '💻' },
                  { id: 'data-ml', title: 'Data y ML', desc: 'Análisis de datos y machine learning', icon: '📊' },
                  { id: 'api-backend', title: 'API/Backend', desc: 'Servicios y arquitectura backend', icon: '🔧' },
                  { id: 'simulacion', title: 'Simulación', desc: 'Modelos y simulaciones técnicas', icon: '🎯' }
                ].map((tipo) => (
                  <label key={tipo.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="tipoReto"
                      value={tipo.id}
                      checked={formData.tipoReto === tipo.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-6 rounded-lg border-2 transition-all text-center ${
                      formData.tipoReto === tipo.id 
                        ? 'border-secondary-500 bg-secondary-50' 
                        : 'border-neutral-200 hover:border-secondary-300'
                    }`}>
                      <div className="text-3xl mb-3">{tipo.icon}</div>
                      <h3 className="font-semibold text-primary-900 mb-2">{tipo.title}</h3>
                      <p className="text-sm text-primary-600">{tipo.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Sección 4: Evaluación Automática */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Evaluación Automática</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="areaEvaluacion" className="block text-sm font-medium text-primary-700 mb-2">
                      Área tecnológica de evaluación
                    </label>
                    <select
                      id="areaEvaluacion"
                      name="areaEvaluacion"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      value={formData.areaEvaluacion}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccionar área</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="react">React</option>
                      <option value="node">Node.js</option>
                      <option value="sql">SQL/Bases de datos</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Métricas de evaluación
                    </label>
                    <div className="space-y-2">
                      {['Certificaciones', 'Similitud de código', 'Performance', 'Casos de prueba'].map((metrica) => (
                        <label key={metrica} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={metrica.toLowerCase().replace(' ', '-')}
                            checked={formData.metricasEvaluacion.includes(metrica.toLowerCase().replace(' ', '-'))}
                            onChange={(e) => {
                              const value = e.target.value
                              setFormData(prev => ({
                                ...prev,
                                metricasEvaluacion: e.target.checked
                                  ? [...prev.metricasEvaluacion, value]
                                  : prev.metricasEvaluacion.filter(m => m !== value)
                              }))
                            }}
                            className="rounded border-neutral-300 text-secondary-500 focus:ring-secondary-500"
                          />
                          <span className="text-sm text-primary-700">{metrica}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Drag & Drop para archivos de evaluación */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Archivos de evaluación (tests o datasets)
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActiveEval 
                        ? 'border-secondary-500 bg-secondary-50' 
                        : 'border-neutral-300 hover:border-secondary-500'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'eval')}
                    onDragLeave={(e) => handleDrag(e, 'eval')}
                    onDragOver={(e) => handleDrag(e, 'eval')}
                    onDrop={(e) => handleDrop(e, 'eval')}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".js,.py,.json,.csv,.txt"
                      onChange={(e) => handleFileInput(e, 'eval')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">Sube archivos de evaluación</p>
                        <p className="text-sm text-primary-600">Tests unitarios, datasets o casos de prueba</p>
                      </div>
                    </div>
                  </div>
                  
                  {uploadedFilesEval.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFilesEval.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                          <span className="text-sm text-primary-900">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'eval')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sección 5: Recursos */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Recursos</h2>
              </div>
              
              <div className="space-y-6">
                {/* Drag & Drop para documentos */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Documentos o ejemplos
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActiveRecursos 
                        ? 'border-secondary-500 bg-secondary-50' 
                        : 'border-neutral-300 hover:border-secondary-500'
                    }`}
                    onDragEnter={(e) => handleDrag(e, 'recursos')}
                    onDragLeave={(e) => handleDrag(e, 'recursos')}
                    onDragOver={(e) => handleDrag(e, 'recursos')}
                    onDrop={(e) => handleDrop(e, 'recursos')}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.md"
                      onChange={(e) => handleFileInput(e, 'recursos')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">Sube documentos de apoyo</p>
                        <p className="text-sm text-primary-600">PDFs, guías, ejemplos o documentación</p>
                      </div>
                    </div>
                  </div>
                  
                  {uploadedFilesRecursos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFilesRecursos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                          <span className="text-sm text-primary-900">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'recursos')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="repositorioBase" className="block text-sm font-medium text-primary-700 mb-2">
                      Repositorio base
                    </label>
                    <input
                      id="repositorioBase"
                      name="repositorioBase"
                      type="url"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="https://github.com/usuario/repo"
                      value={formData.repositorioBase}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="enlaces" className="block text-sm font-medium text-primary-700 mb-2">
                      Enlaces adicionales
                    </label>
                    <input
                      id="enlaces"
                      name="enlaces"
                      type="url"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="https://..."
                      value={formData.enlaces}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 6: Incentivos y Premios */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Incentivos y Premios</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="premio" className="block text-sm font-medium text-primary-700 mb-2">
                    Premio
                  </label>
                  <input
                    id="premio"
                    name="premio"
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Ej: $1000, Certificado, Entrevista"
                    value={formData.premio}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="tipoPremio" className="block text-sm font-medium text-primary-700 mb-2">
                    Tipo de premio
                  </label>
                  <select
                    id="tipoPremio"
                    name="tipoPremio"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.tipoPremio}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="certificado">Certificado</option>
                    <option value="dinero">Dinero</option>
                    <option value="entrevista">Entrevista</option>
                    <option value="mentoria">Mentoría</option>
                    <option value="curso">Curso premium</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="descripcionPremio" className="block text-sm font-medium text-primary-700 mb-2">
                    Descripción del premio
                  </label>
                  <input
                    id="descripcionPremio"
                    name="descripcionPremio"
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Describe los detalles del premio..."
                    value={formData.descripcionPremio}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="numeroGanadores" className="block text-sm font-medium text-primary-700 mb-2">
                    Número de ganadores o plazas
                  </label>
                  <input
                    id="numeroGanadores"
                    name="numeroGanadores"
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="Ej: 3"
                    value={formData.numeroGanadores}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Sección 7: Configuración final */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-primary-900">Configuración Final</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="visibilidad" className="block text-sm font-medium text-primary-700 mb-2">
                    Visibilidad del reto
                  </label>
                  <select
                    id="visibilidad"
                    name="visibilidad"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    value={formData.visibilidad}
                    onChange={handleInputChange}
                  >
                    <option value="publico">Público - Visible para todos</option>
                    <option value="privado">Privado - Solo por invitación</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terminosCondiciones"
                    name="terminosCondiciones"
                    checked={formData.terminosCondiciones}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-secondary-500 border-neutral-300 rounded focus:ring-secondary-500"
                  />
                  <label htmlFor="terminosCondiciones" className="text-sm text-primary-700">
                    Acepto los términos y condiciones para la publicación de retos
                  </label>
                </div>
              </div>
            </div>

            {/* Acciones finales */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  variant="neutral"
                  size="large"
                  onClick={() => navigate('/retos')}
                  disabled={loading}
                  className="px-8"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={loading || !formData.terminosCondiciones}
                  className="px-12"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Publicando...
                    </div>
                  ) : (
                    'Publicar Reto'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Información de ayuda */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-linear-to-r from-secondary-50 to-secondary-100 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  💡 Consejos para crear un reto exitoso
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-700">
                  <div>
                    <h4 className="font-medium text-primary-900 mb-2">Descripción clara</h4>
                    <p>Define objetivos específicos y medibles. Incluye contexto del problema real.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900 mb-2">Criterios justos</h4>
                    <p>Establece criterios de evaluación transparentes y alcanzables.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900 mb-2">Recursos útiles</h4>
                    <p>Proporciona documentación, APIs o datasets necesarios.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900 mb-2">Tiempo realista</h4>
                    <p>Asigna tiempo suficiente considerando la complejidad del reto.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}