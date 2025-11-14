import React from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function ChallengeDetail() {
  const { id } = useParams();

  // Datos de ejemplo - aquí podrías hacer fetch según el id
  const challenge = {
    id: 1,
    company: "Growth Strategy",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuN8Pu5Yufi00KPDk4cn_8DEacOeUzwjy-C-WCA1iysRWt0SGm4JhUJ14KCvroX2YNg_hvNTg8Hc3e5Y3BLRK9FacRrBh5Idik55bLZVvkKTDoAPuWxUaZ-dp9QcSP0s4EvceA2PedyOOFDTVF8ZzhfcjBqhHwIdafuGreseqSL2EzbKN5rspK1as61kYynyo8AAoavf-pDrP7KIJ6CCegH5dLNiM7-t6AOGbgiq_1v0dXfR9gXI4iBve1WwspV1mP9p8wwb2IUVNA",
    title: "Diseñador UX UI - Diseños para Empresas",
    prize: "Práctica",
    description: "En el Perú, muchos jóvenes universitarios de carreras técnicas e ingenierías no tienen ingresos propios y dependen económicamente de sus padres. ¿Cómo podríamos facilitar el acceso a formación de alta tecnología para estudiantes universitarios con recursos limitados en el Perú, asegurando que la solución sea rentable, escalable y simple?",
    date: "14/11/2025"
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FFFFFF' }}>
      <header className="bg-[#0F2C4E] shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link to="/index" className="flex items-center space-x-3">
                <div className="bg-[#0F2C4E] p-1 rounded-full">
                  <img alt="Logo de Chapa Tu Chamba" className="h-10 w-10" src={logo} />
                </div>
                <span className="text-white font-bold text-lg">CHAPA TU CHAMBA</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8 text-white">
                <Link to="/courses" className="hover:text-[#FFC72C] transition-colors duration-300">
                  Cursos
                </Link>
                <Link 
                  to="/challenges" 
                  className="relative font-semibold text-white after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#FFC72C]"
                >
                  Retos
                </Link>
                <Link to="/challenges/form" className="hover:text-[#FFC72C] transition-colors duration-300">
                  Publica un Reto
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-5 py-2 text-sm font-medium text-white bg-[#0F2C4E] border border-white rounded-lg hover:bg-white hover:text-[#0F2C4E] transition-colors duration-300"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2 text-sm font-bold text-[#0F2C4E] bg-[#FFC72C] rounded-lg hover:opacity-90 transition-opacity duration-300"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white p-8 md:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-10">
              <img 
                alt={`Logo de ${challenge.company}`} 
                className="h-16 w-16 mb-4 sm:mb-0 object-contain" 
                src={challenge.logo} 
              />
              <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: '#0F2C4E' }}>
                {challenge.company}
              </h1>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold" style={{ color: '#0F2C4E' }}>
                Descripción del Reto
              </h2>
              <span className="bg-[#FFC72C] text-[#0F2C4E] text-xs font-semibold px-3 py-1 rounded-full">
                {challenge.prize}
              </span>
            </div>

            <h3 className="text-lg font-bold mb-6" style={{ color: '#0F2C4E' }}>
              {challenge.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-10">
              {challenge.description}
            </p>

            <div className="mb-10">
              <h4 className="text-xl font-bold mb-2" style={{ color: '#0F2C4E' }}>
                Fecha
              </h4>
              <p className="text-gray-600">{challenge.date}</p>
            </div>

            <div className="flex justify-end">
              <Link
                to={`/challenges/${id}/register`}
                className="bg-[#FFC72C] text-[#0F2C4E] font-bold py-3 px-8 rounded-lg text-base shadow-md hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Inscribirse
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
