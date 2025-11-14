import React, { useState } from "react";
import llamaFeliz from '../assets/LLAMA FELIZ.png'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular autenticación exitosa
    const userData = {
      name: formData.email.split('@')[0], // Usar parte del email como nombre
      email: formData.email,
      userType: 'Usuario',
      loginTime: new Date().toISOString()
    };

    // Guardar en localStorage
    localStorage.setItem('chapatuchamba_user', JSON.stringify(userData));
    
    // Redireccionar a index
    window.location.href = '/';
  };
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen bg-white p-6 flex items-center justify-center relative">
      {/* Flecha de regreso */}
      <a 
        href="/" 
        className="absolute top-6 left-6 p-2 bg-[#0F2C4E] text-white rounded-full hover:bg-[#0F2C4E]/90 transition-all duration-300 transform hover:scale-110 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </a>

      <div className="bg-white border-2 border-[#0F2C4E] shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="relative flex justify-center items-center mb-6">
            <div className="absolute bg-[#FFC72C] rounded-full w-32 h-32"></div>
            <img alt="Llama sonriente con un casco de construcción amarillo" className="relative z-10 w-24" src={llamaFeliz} />
          </div>
          <h1 className="text-3xl font-bold text-[#0F2C4E] mb-2">Iniciar Sesión</h1>
          <p className="text-[#0F2C4E]/80">
            Ingresa a tu cuenta y continúa aprendiendo
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F2C4E] mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#0F2C4E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC72C] focus:border-[#FFC72C] text-[#0F2C4E]"
              placeholder="tu@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F2C4E] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#0F2C4E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC72C] focus:border-[#FFC72C] text-[#0F2C4E]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#FFC72C] focus:ring-[#FFC72C] border-[#0F2C4E] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#0F2C4E]">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#0F2C4E] hover:text-[#FFC72C] transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F2C4E] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#0F2C4E]/90 transition-all duration-300 transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="mt-8 text-center">
          <p className="text-[#0F2C4E]/80">
            ¿No tienes cuenta?{' '}
            <a href="/signup" className="font-medium text-[#0F2C4E] hover:text-[#FFC72C] transition-colors">
              Regístrate aquí
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#0F2C4E]/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#0F2C4E]/60">O continúa con</span>
            </div>
          </div>
        </div>

        {/* Botones de redes sociales */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="w-full inline-flex justify-center py-2 px-4 border-2 border-[#0F2C4E] rounded-lg shadow-sm bg-white text-sm font-medium text-[#0F2C4E] hover:bg-[#0F2C4E] hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
            <span className="ml-2">Facebook</span>
          </button>

          <button className="w-full inline-flex justify-center py-2 px-4 border-2 border-[#0F2C4E] rounded-lg shadow-sm bg-white text-sm font-medium text-[#0F2C4E] hover:bg-[#0F2C4E] hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
