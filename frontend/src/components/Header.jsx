import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('chapatuchamba_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('chapatuchamba_user');
    setUser(null);
    window.location.href = '/';
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
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
