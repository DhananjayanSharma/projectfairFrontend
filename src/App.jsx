
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Project from './pages/Project'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/Contextshare'

function App() {
  const {isLoginStatus} = useContext(isLoginAuthContext)


  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project' element={<Project />} />
        <Route path='/dashboard' element={isLoginStatus?<Dashboard />:<PageNotFound/>} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/login' element={<Auth />} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      <Footer/>
      

    </>
  )
}

export default App
