import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services'
import { Button, LlamaImage } from '../../shared/components'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    carrera: '',
    universidad: '',
    resumen: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await authAPI.registerStudent(formData)
      
      // Registro exitoso - redirigir al login
      alert('¡Registro exitoso! Por favor, inicia sesión.')
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      setError('Error en el registro. Por favor, verifica tus datos.')
    } finally {
      setLoading(false)
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleGoogleRegister() {
    // Placeholder para registro con Google
    console.log('Registro con Google')
  }

  function handleFacebookRegister() {
    // Placeholder para registro con Facebook
    console.log('Registro con Facebook')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Botón de atrás minimalista */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
        >
          <svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Card completo con header y formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header dentro del card */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                ChapaTuChamba
              </h1>
              {/* Componente Llama dentro de la carta */}
                <div className="flex justify-center mb-6 mx-[20%]">
                <LlamaImage 
                    imageSrc="/images/LLAMA FELIZ.png"
                    altText="Llama feliz de ChapaTuChamba"
                    className="max-w-xs"
                />
                </div>
              <p className="text-lg text-primary-700 mb-4">
                ¡Únete a nosotros!
              </p>
              <div className="flex justify-center space-x-6 mb-6">
                <Link 
                  to="/login" 
                  className="text-primary-600 hover:text-primary-900 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <span className="text-primary-900 font-semibold border-b-2 border-secondary-500 pb-1">
                  Registrarse
                </span>
              </div>
            </div>

            <div className="border-t border-neutral-300 mb-8" />

            {!showEmailForm ? (
              /* Vista inicial - Solo botones sociales */
              <div className="space-y-4">
                <button
                  onClick={handleGoogleRegister}
                  className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-neutral-700 font-medium">Registrarse con Google</span>
                </button>

                <button
                  onClick={handleFacebookRegister}
                  className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-neutral-700 font-medium">Registrarse con Facebook</span>
                </button>

                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-neutral-700 font-medium">Registrarse con email</span>
                </button>
              </div>
            ) : (
              /* Vista de formulario de registro */
              <div>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="flex items-center text-neutral-600 hover:text-primary-900 mb-6 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-1">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="carrera" className="block text-sm font-medium text-primary-700 mb-1">
                      Carrera
                    </label>
                    <input
                      id="carrera"
                      name="carrera"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="Ej: Ingeniería de Sistemas"
                      value={formData.carrera}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="universidad" className="block text-sm font-medium text-primary-700 mb-1">
                      Universidad
                    </label>
                    <input
                      id="universidad"
                      name="universidad"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      placeholder="Nombre de tu universidad"
                      value={formData.universidad}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="resumen" className="block text-sm font-medium text-primary-700 mb-1">
                      Resumen <span className="text-neutral-500 text-xs">(opcional)</span>
                    </label>
                    <textarea
                      id="resumen"
                      name="resumen"
                      rows="3"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none"
                      placeholder="Cuéntanos un poco sobre ti, tus habilidades o intereses..."
                      value={formData.resumen}
                      onChange={handleInputChange}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                </form>
              </div>
            )}

            {/* Link de login */}
            <div className="mt-6 text-center">
              <span className="text-neutral-600">¿Ya tienes cuenta? </span>
              <Link 
                to="/login" 
                className="text-secondary-500 hover:text-secondary-600 font-semibold transition-colors"
              >
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
