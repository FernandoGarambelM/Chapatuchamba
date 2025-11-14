import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function ChallengeForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: null,
    challengeTitle: "",
    challengeDescription: "",
    challengeCategory: "Tecnología",
    requiredSkills: ["Python", "UI/UX"],
    deadline: "",
    prize: "",
    contactEmail: ""
  });

  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyLogo: e.target.files[0] });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#E5E5E5]">
      <header className="bg-[#0F2C4E] shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/index" className="flex items-center space-x-3">
              <div className="bg-[#0F2C4E] p-1 rounded-full">
                <img alt="Chapa Tu Chamba Logo" className="h-10 w-10" src={logo} />
              </div>
              <span className="text-white text-xl font-bold tracking-wider">CHAPA TU CHAMBA</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/courses" className="text-gray-300 hover:text-white transition-colors duration-200">Cursos</Link>
              <Link to="/challenges" className="text-gray-300 hover:text-white transition-colors duration-200">Retos</Link>
              <Link to="/challenges/form" className="text-white font-semibold border-b-2 border-[#FFC72C] pb-1">Publica un Reto</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-5 py-2 text-sm font-medium text-white border border-white rounded-lg hover:bg-white hover:text-[#0F2C4E] transition-colors duration-300">Iniciar Sesión</Link>
            <Link to="/signup" className="px-5 py-2 text-sm font-medium text-[#0F2C4E] bg-[#FFC72C] rounded-lg hover:opacity-90 transition-opacity duration-300">Registrarse</Link>
          </div>
        </nav>
      </header>

      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F2C4E] dark:text-white">
              Publica tu <span className="text-[#FFC72C]">reto</span>
            </h1>
          </div>
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0F2C4E] dark:text-white">Publica Tu Reto</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Completa los siguientes campos para publicar tu reto en la plataforma.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h3 className="text-lg font-semibold text-[#0F2C4E] dark:text-white mb-6">
                  Información de la Empresa
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="companyName">
                      Nombre de la Empresa
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                      id="companyName"
                      name="companyName"
                      placeholder="Introduce el nombre de tu empresa"
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Logo de la Empresa
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <span className="material-icons-outlined text-4xl text-gray-400 dark:text-gray-500">upload_file</span>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            className="relative cursor-pointer rounded-md font-medium text-[#0F2C4E] dark:text-[#FFC72C] hover:text-[#0F2C4E]/80 dark:hover:text-[#FFC72C]/80"
                            htmlFor="file-upload"
                          >
                            <span>Arrastra y suelta el archivo aquí para subirlo</span>
                            <input
                              className="sr-only"
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                        <button
                          className="mt-4 px-4 py-2 bg-[#0F2C4E] text-white text-sm font-medium rounded-lg hover:bg-[#0F2C4E]/90"
                          type="button"
                        >
                          Subir Logo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h3 className="text-lg font-semibold text-[#0F2C4E] dark:text-white mb-6">Detalles del Reto</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="challengeTitle">
                      Título del Reto
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                      id="challengeTitle"
                      name="challengeTitle"
                      placeholder="El Diseño de una nueva app de movilidad"
                      type="text"
                      value={formData.challengeTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="challengeDescription">
                      Descripción del Reto
                    </label>
                    <textarea
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                      id="challengeDescription"
                      name="challengeDescription"
                      placeholder="Explica en detalle en qué consiste el reto..."
                      rows="4"
                      value={formData.challengeDescription}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="challengeCategory">
                      Categoría del Reto
                    </label>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200"
                      id="challengeCategory"
                      name="challengeCategory"
                      value={formData.challengeCategory}
                      onChange={handleInputChange}
                    >
                      <option>Tecnología</option>
                      <option>Diseño</option>
                      <option>Marketing</option>
                      <option>Negocios</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h3 className="text-lg font-semibold text-[#0F2C4E] dark:text-white mb-6">Requisitos y Premios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Habilidades Requeridas
                    </label>
                    <div className="flex items-center flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      {formData.requiredSkills.map((skill, index) => (
                        <span key={index} className="flex items-center bg-[#FFC72C] text-[#0F2C4E] text-sm font-medium px-2.5 py-1 rounded-full">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1.5 text-[#0F2C4E]/70 hover:text-[#0F2C4E]"
                            type="button"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        className="flex-grow bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 min-w-[150px]"
                        placeholder="Añade una habilidad..."
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill(e)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="deadline">
                      Fecha Límite para Envío
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200"
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="prize">
                      Premio / Oportunidad
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                      id="prize"
                      name="prize"
                      placeholder="Ej: Pasantía, Dinero en efectivo"
                      type="text"
                      value={formData.prize}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0F2C4E] dark:text-white mb-6">Información de Contacto</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="contactEmail">
                    Contacto de la Empresa
                  </label>
                  <input
                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-navy focus:border-brand-navy dark:focus:ring-brand-yellow dark:focus:border-[#FFC72C] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                    id="contactEmail"
                    name="contactEmail"
                    placeholder="Introduce un email de contacto"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  className="w-full bg-[#FFC72C] text-[#0F2C4E] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 text-lg"
                  type="submit"
                >
                  Enviar Reto
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
