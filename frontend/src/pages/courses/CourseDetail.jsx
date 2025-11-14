import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function CourseDetail() {
  const [openAccordion, setOpenAccordion] = useState(1);
  const [openPractice, setOpenPractice] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const togglePractice = (id) => {
    setOpenPractice(openPractice === id ? null : id);
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#FFFFFF' }}>
      <Header />

      <main className="container mx-auto px-6 py-12 md:py-16">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <p className="text-xl font-medium mb-1" style={{ color: '#0F2C4E' }}>Estudia</p>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ color: '#0F2C4E' }}>
              Ciencia de Datos <br />con Python
            </h1>
          </div>
          <div className="mt-8 md:mt-0 flex items-center justify-center">
            <img 
              alt="Python language logo" 
              className="h-32 w-32 md:h-40 md:w-40 object-contain" 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
            />
          </div>
        </section>

        <div className="space-y-1">
          <div className="border-b border-[#E5E5E5]">
            <button 
              onClick={() => toggleAccordion(1)} 
              className="w-full flex justify-between items-center py-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex-shrink-0"></div>
                <span className="font-semibold text-lg text-[#0F2C4E]">
                  Fundamentos de Programación con Python
                </span>
              </div>
              <span className={`material-icons text-[#0F2C4E] transition-transform duration-300 ${openAccordion === 1 ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            {openAccordion === 1 && (
              <div className="pb-6 pl-16">
                <div className="bg-gray-800 rounded-lg overflow-hidden relative aspect-video max-w-2xl mb-6">
                  <img 
                    alt="Video player showing Python code" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOhQ_NRyDU2vuUhqq7rrSz3VJ65eScR0st9McusRheS42xhvunaaSXeDuGUbf2Z-1-IDXASF8HqOVJ2fUR_I8j9moxUet8iihOUef3FhVOnpye6ZAdBfkDCc0lzFX-Iz-jNex2Og__7NhwhwHNEKhRjYvrVjSvF7eX_XCXBMg-4VDZwVi-DKP0kkQJq-eyPtnea-Ur0zTTojWksJ_8PwEzveGBS7VZsAgajwza-_mJ4DzfgmvsXSssUe-fz8zcypdYOuWP644M8Afp"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <span className="material-icons text-white text-5xl ml-1">play_arrow</span>
                    </button>
                  </div>
                </div>
                <div className="mb-6 flex items-center space-x-3">
                  <div className="bg-red-500 w-8 h-8 rounded-md flex items-center justify-center">
                    <span className="material-icons text-white text-xl">picture_as_pdf</span>
                  </div>
                  <span className="text-gray-700">Descarga Material/PDF</span>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p>Variables y Tipos de Datos: Python es un lenguaje dinámico lo que significa que no es necesario declarar el tipo de una variable. Se pueden utilizar variables de diferentes tipos:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Enteros(int): x = 5</li>
                    <li>Datos Reales (float): pi = 3.14</li>
                    <li>Cadenas de texto (str): nombre = "Charly"</li>
                    <li>Booleanos (bool): es_valido = True</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {[
            { id: 2, title: "Instalación y uso Básico de Python" },
            { id: 3, title: "Semántica y Sintaxis de Programación" },
            { id: 4, title: "Operadores Básicos y Manejo de Cadena" },
            { id: 5, title: "Uso de Selectivas" }
          ].map(section => (
            <div key={section.id} className="border-b border-[#E5E5E5]">
              <button 
                onClick={() => toggleAccordion(section.id)} 
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex-shrink-0"></div>
                  <span className="font-semibold text-lg text-[#0F2C4E]">{section.title}</span>
                </div>
                <span className={`material-icons text-[#0F2C4E] transition-transform duration-300 ${openAccordion === section.id ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {openAccordion === section.id && (
                <div className="p-6 text-gray-600 dark:text-gray-400">Contenido para esta sección.</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-[#FFC72C] text-[#0F2C4E] font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
            Ver más
          </button>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-[#0F2C4E] mb-6">Ponte a Prueba</h2>
          <div className="space-y-1">
            {[
              { id: 1, title: "Practica: Operadores y Tipos de Datos" },
              { id: 2, title: "Practica: Selectivas" }
            ].map(practice => (
              <div key={practice.id} className="border-b border-[#E5E5E5]">
                <button 
                  onClick={() => togglePractice(practice.id)} 
                  className="w-full flex justify-between items-center py-6 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex-shrink-0"></div>
                    <span className="font-semibold text-lg text-[#0F2C4E]">{practice.title}</span>
                  </div>
                  <span className={`material-icons text-[#0F2C4E] transition-transform duration-300 ${openPractice === practice.id ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openPractice === practice.id && (
                  <div className="p-6 text-gray-600 dark:text-gray-400">Contenido de práctica para esta sección.</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#FFC72C] text-[#0F2C4E] font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
              Ver más
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
