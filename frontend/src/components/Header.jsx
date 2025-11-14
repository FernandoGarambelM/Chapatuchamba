import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('chapatuchamba_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('chapatuchamba_user');
    setUser(null);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#0F2C4E] shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link className="flex items-center space-x-2" to="/">
            <div className="bg-[#0F2C4E] rounded-full p-1 border-2 border-white">
              <img alt="Llama con casco amarillo" className="h-10 w-10" src={logo} />
            </div>
            <span className="text-white text-lg font-bold tracking-wide">CHAPA TU CHAMBA</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link className="text-white hover:text-[#FFC72C] transition-colors duration-300" to="/courses">Cursos</Link>
            <Link className="text-white hover:text-[#FFC72C] transition-colors duration-300" to="/challenges">Retos</Link>
            <Link className="text-white hover:text-[#FFC72C] transition-colors duration-300" to="/challenges/form">Publica un Reto</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <div className="w-8 h-8 bg-[#FFC72C] rounded-full flex items-center justify-center">
                  <span className="text-[#0F2C4E] font-bold text-sm">
                    {user.firstName ? user.firstName[0].toUpperCase() : (user.name ? user.name[0].toUpperCase() : '?')}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name}
                </span>
                <span className="text-[#FFC72C] text-xs bg-white/20 px-2 py-1 rounded">
                  {user.userType || 'Usuario'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg border border-red-600 hover:bg-red-700 transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <Link className="bg-[#0F2C4E] text-white px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-[#0F2C4E] transition-colors duration-300" to="/login">Iniciar Sesión</Link>
              <Link className="bg-[#FFC72C] text-[#0F2C4E] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300" to="/signup">Registrarse</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F2C4E] border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            {/* Enlaces de navegación */}
            <div className="space-y-3">
              <Link 
                className="block text-white hover:text-[#FFC72C] transition-colors duration-300 py-2" 
                to="/courses"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link 
                className="block text-white hover:text-[#FFC72C] transition-colors duration-300 py-2" 
                to="/challenges"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Retos
              </Link>
              <Link 
                className="block text-white hover:text-[#FFC72C] transition-colors duration-300 py-2" 
                to="/challenges/form"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Publica un Reto
              </Link>
            </div>

            {/* Usuario o botones de auth */}
            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-3 rounded-lg">
                    <div className="w-8 h-8 bg-[#FFC72C] rounded-full flex items-center justify-center">
                      <span className="text-[#0F2C4E] font-bold text-sm">
                        {user.firstName ? user.firstName[0].toUpperCase() : (user.name ? user.name[0].toUpperCase() : '?')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-medium block">
                        {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name}
                      </span>
                      <span className="text-[#FFC72C] text-xs">
                        {user.userType || 'Usuario'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    className="block w-full text-center bg-[#0F2C4E] text-white px-4 py-3 rounded-lg border border-white hover:bg-white hover:text-[#0F2C4E] transition-colors duration-300" 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    className="block w-full text-center bg-[#FFC72C] text-[#0F2C4E] px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300" 
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
