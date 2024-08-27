import { useState } from 'react'
import './App.css'
import Loginpage from './page/Login/Loginpage'
import Signuppage from './page/Signup/Signuppage'
import Homepage from './page/Home/Homepage'
import { Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className = 'p-4 h-screen flex items-center justify-center '>
      <Routes>
        <Route path='/' element={authUser ? <Homepage/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={authUser? <Navigate to={'/'}/> : <Loginpage/>}/>
        <Route path='/signup' element={authUser? <Navigate to={'/'}/> : <Signuppage/>}/>
      </Routes>
      <Toaster/>
    </div>
    
  )
}

export default App
