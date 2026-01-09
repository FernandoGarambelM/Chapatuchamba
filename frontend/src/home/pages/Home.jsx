import React from 'react'
import { Button, ChallengeCard, LlamaImage } from '../../shared/components'

export default function Home() {
  // Datos de ejemplo para los retos
  const challenges = [
    {
      id: 1,
      company: "TechCorp Solutions",
      title: "Sistema de Gestión E-commerce",
      description: "Desarrolla una plataforma completa de comercio electrónico con React y Node.js",
      category: "Desarrollo Web",
      technology: "React",
      prize: "$2,000",
      opportunityType: "Contratación",
      gradient: "bg-linear-to-r from-blue-500 to-purple-600",
      icon: '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>'
    },
    {
      id: 2,
      company: "InnovateLab",
      title: "Predictor de Precios Inmobiliarios",
      description: "Crea un modelo de ML que prediga precios de propiedades usando Python",
      category: "Machine Learning",
      technology: "Python",
      prize: "$3,500",
      opportunityType: "Prácticas",
      gradient: "bg-linear-to-r from-green-500 to-teal-600",
      icon: '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
      id: 3,
      company: "EcoTech Startup",
      title: "App de Delivery Sostenible",
      description: "Diseña una aplicación móvil con enfoque en sostenibilidad y UX",
      category: "Mobile App",
      technology: "Flutter",
      prize: "$2,800",
      opportunityType: "Pasantía",
      gradient: "bg-linear-to-r from-orange-500 to-red-600",
      icon: '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
    }
  ]

  return (
    <div>
      {/* Zona 1: Hero Section */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-12 items-center">
            <div className="col-span-2 text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-900 leading-tight">
                Porque todos los peruanos {' '}
                <span className="text-secondary-500">queremos Chamba!</span>
              </h1>
              <p className="mt-6 text-xl text-primary-700 leading-relaxed">
                Aprende lo que el mercado tecnológico realmente necesita y 
                prepárate para la revolución tecnológica con nosotros
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="large"
                  to="/retos"
                >
                  Ver Retos
                </Button>
                <Button 
                  variant="neutral" 
                  size="large"
                  to="/empresas"
                >
                  Publica un Reto
                </Button>
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <LlamaImage 
                imageSrc="/images/LLAMA FELIZ.png"
                altText="Profesionales trabajando en tecnología"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zona 2: Cómo funciona */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-row items-center justify-center mb-16">
            {/* Texto a la izquierda */}
            <div className="text-right">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-6xl text-secondary-500 font-semibold">
                Este es el proceso
              </p>
            </div>
            
            {/* Imagen a la derecha */}
            <div className="shrink-0">
              <div className="w-40 h-40">
                <img 
                  src="/images/llamaPensativa.png" 
                  alt="Proceso de trabajo" 
                  className="w-full h-full -ml-8"
                  onError={(e) => {
                    // Fallback placeholder
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-linear-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg class="w-16 h-16 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Para Estudiantes */}
            <div>
              <h3 className="text-3xl font-bold text-neutral-50 mb-8 text-center">
                Para Estudiantes
              </h3>
              <div className="relative">
                {/* Línea conectora - Solo visible en pantallas grandes */}
                <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-primary-700"></div>
                    <div className="w-6"></div>
                    <div className="flex-1 h-2 bg-primary-700"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">1.Regístrate</h4>
                    <p className="text-neutral-300">
                      Crea tu perfil y muestra tus habilidades técnicas
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">2.Elige un reto</h4>
                    <p className="text-neutral-300">
                      Explora desafíos técnicos de empresas reales
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">3.Gana</h4>
                    <p className="text-neutral-300">
                      Recibe reconocimiento, premios y oportunidades laborales
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Para Empresas */}
            <div>
              <h3 className="text-3xl font-bold text-neutral-50 mb-8 text-center">
                Para Empresas
              </h3>
              <div className="relative">
                {/* Línea conectora - Solo visible en pantallas grandes */}
                <div className="hidden lg:block absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-primary-700"></div>
                    <div className="w-6"></div>
                    <div className="flex-1 h-2 bg-primary-700"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">1.Publica un reto</h4>
                    <p className="text-neutral-300">
                      Define desafíos técnicos reales de tu empresa
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">2.Revisa perfiles</h4>
                    <p className="text-neutral-300">
                      Evalúa las soluciones y conoce a los participantes
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">3.Contrata talento</h4>
                    <p className="text-neutral-300">
                      Conecta directamente con los mejores desarrolladores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zona 3: Retos Recientes */}
      <section className="bg-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              Retos Recientes
            </h2>
            <p className="text-lg text-primary-700">
              Descubre los desafíos más populares de nuestras empresas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <ChallengeCard 
                key={challenge.id} 
                challenge={challenge} 
                variant="card" 
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="large" to="/retos">
              Ver Todos los Retos
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}