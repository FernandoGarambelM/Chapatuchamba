import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import { Home } from './home'
import { Layout } from './shared/components'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta home con navbar */}
        <Route path="/" element={
          <Layout showNavbar={true}>
            <Home />
          </Layout>
        } />
        
        {/* Rutas de auth sin navbar */}
        <Route path="/login" element={
          <Layout showNavbar={false} showFooter={false}>
            <Login />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout showNavbar={false} showFooter={false}>
            <Register />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
