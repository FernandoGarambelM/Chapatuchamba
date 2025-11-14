import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";

export default function ChallengeRegistration() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    major: "",
    skills: "",
    portfolio: "",
    motivation: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Guardar inscripción en localStorage
    const registeredChallenges = JSON.parse(localStorage.getItem('registeredChallenges') || '[]');
    if (!registeredChallenges.includes(id)) {
      registeredChallenges.push(id);
      localStorage.setItem('registeredChallenges', JSON.stringify(registeredChallenges));
    }
    
    console.log("Form submitted:", formData);
    
    // Redirigir a la página de retos
    navigate('/challenges');
  };

  return (
    <div style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif', backgroundColor: '#E5E5E5' }}>
      <Header />

      <main className="flex flex-1 justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight" style={{ color: '#0F2C4E' }}>
              Inscríbete al <span className="text-[#FFC72C]">Reto</span>
            </h1>
            <p className="mt-2 text-lg font-bold" style={{ color: '#0F2C4E' }}>
              Modelo Predictivo - Satisfacción en la Universidad
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 sm:p-12 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: '#0F2C4E' }}>
                Tus Datos para el Reto
              </h2>
              <p className="mt-1 text-base text-gray-500">
                Completa los siguientes campos para postular a este emocionante reto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-bold leading-tight" style={{ color: '#0F2C4E' }}>
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                      Nombre Completo
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="fullName"
                      name="fullName"
                      placeholder="Introduce tu nombre completo"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="email"
                      name="email"
                      placeholder="Introduce tu correo electrónico"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="university">
                      Universidad / Institución
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="university"
                      name="university"
                      placeholder="Nombre de tu universidad o institución"
                      type="text"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="major">
                      Carrera / Especialidad
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="major"
                      name="major"
                      placeholder="Tu carrera o área de estudio"
                      type="text"
                      value={formData.major}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold leading-tight" style={{ color: '#0F2C4E' }}>
                  Tu Talento
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="skills">
                      Habilidades Clave
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="skills"
                      name="skills"
                      placeholder="Añade tus habilidades principales..."
                      type="text"
                      value={formData.skills}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="portfolio">
                      Enlace a Portafolio / LinkedIn
                    </label>
                    <input
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="portfolio"
                      name="portfolio"
                      placeholder="https://..."
                      type="url"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="motivation">
                      ¿Por qué quieres participar?
                    </label>
                    <textarea
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#0F2C4E] focus:ring-[#0F2C4E] sm:text-sm"
                      id="motivation"
                      name="motivation"
                      placeholder="Cuéntanos tu motivación..."
                      rows="4"
                      value={formData.motivation}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Link
                  to="/challenges"
                  className="px-6 py-3 text-sm font-bold text-[#0F2C4E] bg-transparent border-2 border-[#0F2C4E] rounded-lg hover:bg-[#0F2C4E] hover:text-white transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-bold text-[#0F2C4E] bg-[#FFC72C] rounded-lg hover:opacity-90 transition-opacity"
                >
                  Enviar Inscripción
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
