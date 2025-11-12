import { useState, useEffect } from 'react'
import api from './services/api'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null })

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const data = await api.get('/health/')
        setApiStatus({ loading: false, data, error: null })
      } catch (error) {
        setApiStatus({ loading: false, data: null, error: error.message })
      }
    }
    checkAPI()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Chapatuchamba Logo" className="w-32 h-32 object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          🚀 Chapatuchamba
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            React + Django + Tailwind
          </h2>
          <p className="text-gray-600">
            Tu stack completo está listo para desarrollar
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Estado del Backend:
          </h3>
          {apiStatus.loading ? (
            <p className="text-gray-500">⏳ Conectando con el backend...</p>
          ) : apiStatus.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ Error: {apiStatus.error}</p>
              <p className="text-sm text-red-600 mt-2">
                Asegúrate de que el backend esté corriendo en http://localhost:8000
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-medium">
                ✅ {apiStatus.data?.message}
              </p>
              <p className="text-sm text-green-600 mt-1">
                Status: {apiStatus.data?.status}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚛️</span>
            <span className="text-gray-700">React 19</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎨</span>
            <span className="text-gray-700">Tailwind CSS v4</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🐍</span>
            <span className="text-gray-700">Django + DRF</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Edita <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> para comenzar
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
