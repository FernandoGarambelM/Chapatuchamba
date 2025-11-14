import { useState, useEffect } from 'react'
import api from './services/api'
import './App.css'
import logo from './assets/logo.png'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Toaster} from 'sonner'
import Index from './pages/index'
import Login from './pages/login'
import SignUp from './pages/signup'
import Courses from './pages/courses'
import CreateCourse from './pages/courses/addCourse'
import Challenges from './pages/challenges'
import CreateChallenge from './pages/challenges/addChallenge'
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
      <BrowserRouter basename="/">
        <Toaster richColors position='top-right' expand={true} />
        <Routes>
          <Route path='/' element={<Navigate to='/index' replace />} />
          <Route path='/index' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/signup'
            element={<SignUp/> }
          >
          </Route>
          <Route path='/courses' element={<Courses/>}>
            <Route path='/courses/create' element={<CreateCourse/>}/>
          </Route>
          <Route path='/challenges' element={<Challenges/>}>
            <Route path='/challenges/create' element={<CreateChallenge/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
