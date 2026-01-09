import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-neutral-50 mb-4 block">
              ChapaTuChamba
            </Link>
            <p className="text-neutral-300 mb-4 max-w-md">
              La plataforma líder para conectar talento con oportunidades laborales. 
              Encuentra tu próximo empleo o publica ofertas de trabajo de manera fácil y rápida.
            </p>
            <div className="flex space-x-4">
              {/* Redes sociales */}
              <a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-neutral-300 hover:text-secondary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links de navegación */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/retos" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Retos
                </Link>
              </li>
              <li>
                <Link 
                  to="/empresas" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link 
                  to="/sobre-nosotros" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacidad" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/terminos" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link 
                  to="/ayuda" 
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-300 text-sm">
              © {new Date().getFullYear()} ChapaTuChamba. Todos los derechos reservados.
            </p>
            <p className="text-neutral-300 text-sm mt-2 md:mt-0">
              Hecho con ❤️ en Perú
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}