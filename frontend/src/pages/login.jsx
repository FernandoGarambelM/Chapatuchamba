import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Pagina de Login</h1>
        <p className="text-gray-600">
          Esta es una estructura básica para comenzar tu desarrollo en React.
        </p>

        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Acción
          </button>
        </div>
      </div>
    </div>
  );
}
