import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '../../shared/components'

export default function Profile() {
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem('authToken')
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')
    
    if (!token) {
      setIsLoading(false)
      return
    }

    setUserEmail(email || '')
    setUserRole(role || 'estudiante')
    setIsLoading(false)
  }, [])

  // Redirigir al login si no está autenticado
  if (!isLoading && !localStorage.getItem('authToken')) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header del perfil */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-300 overflow-hidden">
          <div className="px-6 py-8 bg-primary-900">
            <div className="flex items-center">
              {/* Avatar grande */}
              <div className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center text-primary-900 font-bold text-2xl mr-6">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
                <p className="text-neutral-300">{userEmail}</p>
                <span className="inline-block px-3 py-1 mt-2 text-xs font-medium bg-secondary-500 text-primary-900 rounded-full">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información personal */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                  Información Personal
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <div className="px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-600">
                    {userEmail}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Tipo de cuenta
                  </label>
                  <div className="px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-600">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                  Estadísticas
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-neutral-100 rounded-lg">
                    <div className="text-2xl font-bold text-primary-900">0</div>
                    <div className="text-sm text-neutral-600">Retos Completados</div>
                  </div>
                  
                  <div className="text-center p-4 bg-neutral-100 rounded-lg">
                    <div className="text-2xl font-bold text-primary-900">0</div>
                    <div className="text-sm text-neutral-600">Retos Publicados</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-8 pt-6 border-t border-neutral-300 flex space-x-4">
              <Button variant="secondary" size="medium">
                Editar Perfil
              </Button>
              <Button variant="outline" size="medium">
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}