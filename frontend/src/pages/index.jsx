import React from "react";
import logo from "../assets/logo.png";
import llamaFeliz from "../assets/LLAMA FELIZ.png";
import llamaPensativa from "../assets/llama pensativa.png";
import llamita from "../assets/LLAMITA.png";

export default function Index() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white text-[#0F2C4E]">
      <header className="bg-[#0F2C4E] shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a className="flex items-center space-x-2" href="#">
              <div className="bg-[#0F2C4E] rounded-full p-1 border-2 border-white">
                <img alt="Llama con casco amarillo" className="h-10 w-10" src={logo} />
              </div>
              <span className="text-white text-lg font-bold tracking-wide">CHAPA TU CHAMBA</span>
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a className="text-white hover:text-[#FFC72C] transition-colors duration-300" href="/courses">Cursos</a>
              <a className="text-white hover:text-[#FFC72C] transition-colors duration-300" href="/challenges">Retos</a>
              <a className="text-white hover:text-[#FFC72C] transition-colors duration-300" href="/challenges/create">Publica un Reto</a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a className="bg-[#0F2C4E] text-white px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-[#0F2C4E] transition-colors duration-300" href="/login">Iniciar Sesión</a>
            <a className="bg-[#FFC72C] text-[#0F2C4E] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300" href="/signup">Registrarse</a>
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

      <main>
        <section className="bg-white py-20 lg:py-32">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0F2C4E]">
                Porque todos los <span className="text-[#FFC72C]">peruanos</span> queremos <span className="text-[#FFC72C]">Chamba!</span>
              </h1>
              <p className="mt-6 text-lg text-[#0F2C4E]/80 max-w-xl mx-auto lg:mx-0">
                Aprende lo que el mercado tecnológico realmente necesita y prepárate para la revolución tecnológica con nosotros
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a className="bg-[#FFC72C] text-[#0F2C4E] px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105" href="#">Ver Retos</a>
                <a className="bg-white text-[#0F2C4E] border-2 border-[#0F2C4E] px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#0F2C4E] hover:text-white transition-colors duration-300" href="#">Publicar un Reto</a>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="absolute bg-[#FFC72C] rounded-full w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]"></div>
              <img alt="Llama sonriente con un casco de construcción amarillo" className="relative z-10 w-64 md:w-80 lg:w-[420px]" src={llamaFeliz} />
            </div>
          </div>
        </section>

        <section className="bg-[#0F2C4E] py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-end gap-4 mb-4">
              <div>
                <h3 className="text-white text-2xl font-semibold">¿Cómo funciona?</h3>
                <h2 className="text-[#FFC72C] text-4xl md:text-5xl font-extrabold">Este es el proceso</h2>
              </div>
              <img alt="Llama pequeña con un signo de interrogación" className="h-16 mb-2 hidden sm:block" src={llamaPensativa} />
            </div>
            <div className="mt-16 grid lg:grid-cols-2 gap-16">
              <div>
                <h4 className="text-white text-3xl font-bold mb-8">Para los Estudiantes</h4>
                <div className="grid sm:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] text-5xl w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">1. Regístrate</h5>
                    <p className="text-white/80 mt-2 text-sm">Crea tu perfil y sube tus habilidades</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">2. Elige un Reto</h5>
                    <p className="text-white/80 mt-2 text-sm">Explora los retos y elige el que te apasione</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">3. Gana</h5>
                    <p className="text-white/80 mt-2 text-sm">Gana premios y obtén oportunidades</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white text-3xl font-bold mb-8">Para las Empresas</h4>
                <div className="grid sm:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">1. Publica tu reto</h5>
                    <p className="text-white/80 mt-2 text-sm">Llega a una red de talento joven y motivado</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">2. Revisa Soluciones</h5>
                    <p className="text-white/80 mt-2 text-sm">Recibe propuestas innovadoras y creativas</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-[#FFC72C] bg-white flex items-center justify-center mb-4">
                      <svg className="text-[#0F2C4E] w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <h5 className="text-white text-xl font-bold">3. Contrata Talento</h5>
                    <p className="text-white/80 mt-2 text-sm">Identifica y contrata a los mejores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-end gap-4 mb-12">
              <img alt="Llama pequeña mirando hacia arriba" className="h-16 mb-2 hidden sm:block transform scale-x-[-1]" src={llamita} />
              <div>
                <h3 className="text-2xl font-semibold text-gray-500">Explora Oportunidades</h3>
                <h2 className="text-[#FFC72C] text-4xl md:text-5xl font-extrabold">Retos Recientes</h2>
              </div>
              <img alt="Llama pequeña mirando hacia arriba" className="h-16 mb-2 hidden sm:block" src={llamita} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white border border-[#E5E5E5] rounded-lg p-6 text-left shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-[#FFC72C] rounded-full mr-3"></div>
                    <span className="text-gray-500">Data Mining Perú</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0F2C4E] mb-2 flex-grow">Modelo Predictivo - Satisfacción en la Universidad</h4>
                  <p className="text-gray-600 text-sm mb-4">Queremos conocer en que grado los alumnos de una universidad recomendarían a su universidad.</p>
                  <div className="flex gap-2 mb-6">
                    <span className="bg-[#FFC72C] text-[#0F2C4E] text-xs font-semibold px-3 py-1 rounded-full">Empresarial</span>
                    <span className="bg-[#D1FAE5] text-[#0F2C4E] text-xs font-semibold px-3 py-1 rounded-full">Predicción</span>
                  </div>
                  <a className="mt-auto bg-[#0F2C4E] text-white text-center py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300" href="#">Ver más</a>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a className="bg-[#FFC72C] text-[#0F2C4E] px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 inline-block" href="#">Ver más Retos</a>
            </div>
          </div>
        </section>

        <section className="bg-[#0F2C4E] py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-snug">¿Listo para aprender de tech o encontrar el talento que necesitas?</h2>
            <p className="text-white/80 italic mt-6 text-lg">"La educación es el motor del desarrollo de un país." - Pedro Paulet</p>
            <div className="mt-10">
              <a className="bg-[#FFC72C] text-[#0F2C4E] px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 inline-block" href="#">Registrarse</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F2C4E] border-t border-white/10">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-[#0F2C4E] rounded-full p-1 border-2 border-white">
              <img alt="Llama con casco amarillo" className="h-8 w-8" src={logo} />
            </div>
            <span className="text-white font-bold">CHAPA TU CHAMBA</span>
          </div>
          <p className="text-white/70 text-sm mb-4 md:mb-0">© 2024 Chapa tu Chamba. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <a className="text-white/70 hover:text-[#FFC72C] transition-colors" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a className="text-white/70 hover:text-[#FFC72C] transition-colors" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a className="text-white/70 hover:text-[#FFC72C] transition-colors" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
