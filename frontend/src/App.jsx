import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import { Home } from './home'
import { ChallengesList, PublishChallenge, ChallengeDetail } from './challenges'
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
        
        {/* Rutas de retos con navbar */}
        <Route path="/retos" element={
          <Layout showNavbar={true}>
            <ChallengesList />
          </Layout>
        } />
        <Route path="/retos/publicar" element={
          <Layout showNavbar={true}>
            <PublishChallenge />
          </Layout>
        } />
        <Route path="/retos/:id" element={
          <Layout showNavbar={true}>
            <ChallengeDetail />
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
