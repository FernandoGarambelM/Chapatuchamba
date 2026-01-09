import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

export default function Navbar() {
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
            <Link 
              to="/login" 
              className="text-neutral-50 hover:text-neutral-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
          </div>
        </div>
      </div>
    </nav>
  )
}