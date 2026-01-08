import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import { Layout } from './shared/components'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta home con navbar */}
        <Route path="/" element={
          <Layout showNavbar={true}>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                  ChapaTuChamba
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Proyecto React + Vite creado en la carpeta <code className="bg-gray-100 px-2 py-1 rounded">frontend</code>
                </p>
              </div>
            </div>
          </Layout>
        } />
        
        {/* Rutas de auth sin navbar */}
        <Route path="/login" element={
          <Layout showNavbar={false}>
            <Login />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout showNavbar={false}>
            <Register />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
