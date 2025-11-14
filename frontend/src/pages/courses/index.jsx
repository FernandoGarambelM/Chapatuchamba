import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import llamaLaptop from "../../assets/llama-laptop.png";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Ciencia de Datos con Python",
      description: "La ciencia de datos es una disciplina clave que utiliza métodos, analíticas y herramientas computacionales para obtener conocimiento valioso a partir de datos.",
      link: "/courses/1"
    },
    {
      id: 2,
      title: "Ciberseguridad y Redes",
      description: "La ciberseguridad y el conocimiento de redes contribuyen habilidades de networking, computer programming, database management y software engineering.",
      link: "/courses/2"
    },
    {
      id: 3,
      title: "Desarrollo Web",
      description: "Actualmente todo está contenido en la web, conocer como funcionan y que medios usa su creación es importante para el manejo de datos.",
      link: "/courses/3"
    },
    {
      id: 4,
      title: "Tecnologías emergentes",
      description: "Inteligencia Artificial y robots autónomos son ejemplos de como la tecnología transforma distintos campos y estás preparado a introducir estos temas en ámbito de profesionalismo.",
      link: "/courses/4"
    },
    {
      id: 5,
      title: "Fundamentos de TI",
      description: "Es fundamental adquirir una base técnica sólida, tales como: soporte técnico, seguridad de la red, administración de servidores y hardware, sistemas operativos, etc.",
      link: "/courses/5"
    },
    {
      id: 6,
      title: "Desarrollo Móvil",
      description: "El conocimiento de desarrollo y programación de Apps supone un importante factor que complementa y afianza muchos proyectos.",
      link: "/courses/6"
    }
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white text-[#0F2C4E]">
      <Header />

      <main className="container mx-auto px-6 py-16 sm:py-24">
        <section className="relative mb-20 md:mb-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: '#0F2C4E' }}>
              Cursos que te preparan para la <span className="text-[#FFC72C]">tecnología actual y futura</span>
            </h1>
            <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>
              Porque todo lo que necesitas para brillar, es una oportunidad para aprender.
            </p>
          </div>
          {/* Círculo amarillo con llama */}
          <div className="absolute top-0 right-0 -translate-y-1/4 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-[#FFC72C] rounded-full flex items-center justify-center">
            <img 
              src={llamaLaptop} 
              alt="Llama con laptop" 
              className="relative z-10 w-64 md:w-80 lg:w-96"
            />
          </div>
        </section>

        <section className="mb-20 md:mb-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0F2C4E' }}>Cursos Disponibles</h2>
          <p className="max-w-3xl mb-12" style={{ color: '#6B7280' }}>
            Estos cursos de alta tecnología son proporcionados gracias a nuestros aliados, empresas, universidades e instituciones.
          </p>
          <div className="space-y-8">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
                className={`flex items-start space-x-6 py-6 ${index < courses.length - 1 ? 'border-b border-[#E5E5E5] dark:border-gray-700' : ''}`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0F2C4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <Link to={course.link} className="no-underline">
                    <h3 style={{ color: '#0F2C4E' }} className="text-xl font-bold hover:text-[#FFC72C] transition-colors cursor-pointer">{course.title}</h3>
                  </Link>
                  <p className="mt-1 text-[#6B7280] dark:text-gray-400">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-16">
          <p className="text-xl text-[#6B7280] dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Si ya tienes lo necesario, atrévete a participar de los retos que tenemos para ti.
          </p>
          <Link to="/challenges" className="inline-block bg-[#FFC72C] text-[#0F2C4E] font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
            Ver Retos
          </Link>
        </section>
      </main>
    </div>
  );
}
