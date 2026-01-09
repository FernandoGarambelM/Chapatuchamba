import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { authAPI } from '../../auth/services'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Verificar si el usuario está logueado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const email = localStorage.getItem('email')
    
    if (token && email) {
      setIsLoggedIn(true)
      setUserEmail(email)
    }
  }, [])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await authAPI.logout()
      setIsLoggedIn(false)
      setUserEmail('')
      setDropdownOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
      // Limpiar localStorage incluso si hay error
      localStorage.removeItem('authToken')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      setIsLoggedIn(false)
      setUserEmail('')
      navigate('/')
    }
  }

  // Obtener iniciales del email para el avatar
  const getInitials = (email) => {
    return email.charAt(0).toUpperCase()
  }
  return (
    <nav className="bg-primary-900 shadow-sm border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          {/* Logo a la izquierda */}
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mr-3 relative">
              <img 
                src="/images/logo.png" 
                alt="ChapaTuChamba Logo" 
                className="w-20 h-20  m-auto"
                onError={(e) => {
                  // Ocultar imagen y mostrar iniciales si hay error
                  e.target.style.display = 'none';
                  e.target.parentElement.querySelector('.logo-fallback').style.display = 'block';
                }}
                onLoad={(e) => {
                  // Ocultar iniciales si la imagen carga correctamente
                  e.target.parentElement.querySelector('.logo-fallback').style.display = 'none';
                }}
              />
              {/* Fallback: Iniciales si no hay imagen */}
              <span className="logo-fallback text-neutral-50 font-bold text-sm">
                CT
              </span>
            </div>
            <Link to="/" className="text-xl font-bold text-neutral-50">
              ChapaTuChamba
            </Link>
          </div>

          {/* Links de navegación en el centro */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/retos" 
              className="text-neutral-50 hover:text-secondary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Retos
            </Link>
            <Link 
              to="/retos/publicar" 
              className="text-neutral-50 hover:text-secondary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Publica un Reto
            </Link>
          </div>

          {/* Botones de sesión a la derecha */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              // Usuario logueado - Mostrar avatar y dropdown
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {/* Avatar circular */}
                  <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center text-primary-900 font-semibold hover:bg-secondary-600 transition-colors">
                    {getInitials(userEmail)}
                  </div>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-neutral-200">
                    <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-200">
                      <div className="font-medium">Conectado como</div>
                      <div className="text-xs text-neutral-500 truncate">{userEmail}</div>
                    </div>
                    
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Ver Perfil
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Usuario no logueado - Mostrar botones de login y registro
              <>
                <Link 
                  to="/login" 
                  className="text-neutral-50 hover:text-neutral-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Button 
                  to="/register"
                  variant="secondary"
                  size="medium"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}