import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function Challenges() {
  const [registeredChallenges, setRegisteredChallenges] = useState([]);

  useEffect(() => {
    // Cargar retos inscritos desde localStorage
    const registered = JSON.parse(localStorage.getItem('registeredChallenges') || '[]');
    setRegisteredChallenges(registered);
  }, []);

  const challenges = [
    {
      id: 1,
      company: "Unity Perú",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDck_VoIv4Se1bxAxJPJuTm3p3hWcPWFRjZ3qgswKP4X7qjKse3Ol_Jf0O9NArbxfO_e3OehFvYT1XnqOymPAUNtSGslUyb7VVmTdtqHllINiG8hRh9Z-zWN8wL7cDnCr8vcBx_sBH9zorRpXHQ-ting-HJF-e_zCMXkZfgIuntgEJTaQ7Jx08s3wuGfBbzf6AGCRoOlKyM3feXqmvxZ5nFLEv40RVbGuhECtHRMVxeO19K4r3H5Xqz7QwLDC84r99psMiZc7QL7JTj",
      title: "Hackathon de Innovación - Acceso HighTech para Todos.",
      prize: "Premio S/10 000",
      category: "#tecnologia",
      description: "En el Perú, muchos jóvenes universitarios de carreras técnicas e ingenierías no tienen ingresos propios y dependen económicamente de sus padres. ¿Cómo podríamos facilitar el acceso a formación de alta tecnología para estudiantes universitarios con recursos limitados en el Perú, asegurando que la solución sea rentable, escalable y simple?"
    },
    {
      id: 2,
      company: "Growth Strategy",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuN8Pu5Yufi00KPDk4cn_8DEacOeUzwjy-C-WCA1iysRWt0SGm4JhUJ14KCvroX2YNg_hvNTg8Hc3e5Y3BLRK9FacRrBh5Idik55bLZVvkKTDoAPuWxUaZ-dp9QcSP0s4EvceA2PedyOOFDTVF8ZzhfcjBqhHwIdafuGreseqSL2EzbKN5rspK1as61kYynyo8AAoavf-pDrP7KIJ6CCegH5dLNiM7-t6AOGbgiq_1v0dXfR9gXI4iBve1WwspV1mP9p8wwb2IUVNA",
      title: "Diseñador UX UI - Diseños para Empresas",
      prize: "Práctica",
      category: "#tecnologia",
      description: "Nuestra empresa, Growth Strategy, busca un Diseñador UX/UI en Arequipa para crear soluciones digitales simples y accesibles que faciliten el acceso a formación tecnológica para estudiantes con recursos limitados."
    },
    {
      id: 3,
      company: "FLIT Arequipa",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS9fGNo3NTlrjY_Dw5XlBwAYhK10qgXJz3zNePVKlPE4w3cFXZfVXLCIwEG3YPS4v2wQ8UKPiU-3pG2biTp_78r-19eQ88sjrwmJN6h8LdoRpwAR1j9OZfWWdo1yec0atOt5pKox4syo3HPpkUdSeZ77elMssMsX0UYfyx6SNekcLtMlZCSn9rNHTLdQFwv53BYArl5uYObIhGTNn8LuEBo2nidHxjKO8t9Iwr1l2czjAU8xWN3QT0ybXgubz68sLlD21SQugrGoYG",
      title: "Programador web - Diseñador web",
      prize: "Práctica",
      category: "#tecnologia",
      description: "Nuestra empresa, FLIT Arequipa, busca un Programador Web - Diseñador Web para apoyar el desarrollo de soluciones digitales del evento FLIT Arequipa que se realiza cada junio, impulsando herramientas simples y accesibles para estudiantes con recursos limitados."
    }
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#FFFFFF' }} className="text-[#0F2C4E]">
      <Header />

      <main>
        <section style={{ backgroundColor: '#FFFFFF' }} className="py-16 sm:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span style={{ color: '#0F2C4E' }}>Participa de los retos y aprende lo que el</span><br />
              <span className="text-[#FFC72C] relative inline-block">
                Mercado Tecnológico Necesita
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFC72C]/80"></span>
              </span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>
              Muchas veces lo aprendido a clases ya no es suficiente, atrévete a aprender con proyectos reales de la industria.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: '#FFFFFF' }} className="pb-20 sm:pb-28">
          <div className="container mx-auto px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold" style={{ color: '#0F2C4E' }}>Retos Planteados</h2>
              <p className="mt-4" style={{ color: '#6B7280' }}>
                Explora entre todos los retos que tenemos para ti, mientras aprendes de la industria tecnológica
              </p>
            </div>
            <div className="space-y-6">
              {challenges.map((challenge) => {
                const isRegistered = registeredChallenges.includes(challenge.id.toString());
                
                return (
                  <div key={challenge.id} style={{ backgroundColor: '#FFFFFF' }} className="rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-4 mb-3">
                        <img alt={`${challenge.company} Logo`} className="h-10 w-10 object-contain" src={challenge.logo} />
                        <span style={{ color: '#6B7280' }} className="font-medium">{challenge.company}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#0F2C4E' }}>{challenge.title}</h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xs font-semibold text-[#0F2C4E] bg-[#FFC72C] px-3 py-1 rounded-full">{challenge.prize}</span>
                        <span className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">{challenge.category}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                        {challenge.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {isRegistered ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-green-600 font-semibold text-sm">✓ Ya te inscribiste</span>
                          <Link 
                            to={`/challenges/${challenge.id}`}
                            className="block w-full md:w-auto bg-gray-300 text-gray-600 rounded-md px-8 py-3 font-semibold cursor-not-allowed text-center"
                          >
                            Ver Reto
                          </Link>
                        </div>
                      ) : (
                        <Link 
                          to={`/challenges/${challenge.id}`}
                          className="block w-full md:w-auto bg-[#FFC72C] text-[#0F2C4E] rounded-md px-8 py-3 font-semibold hover:opacity-90 transition-opacity text-center"
                        >
                          Ver Reto
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
