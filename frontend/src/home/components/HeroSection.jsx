import React from 'react'

export default function HeroSection() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        ChapaTuChamba
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Encuentra tu próximo reto profesional y conecta con las mejores empresas
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
          Explorar Retos
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium">
          Para Empresas
        </button>
      </div>
    </div>
  )
}