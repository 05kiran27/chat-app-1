import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loginpage from './page/Login/Loginpage'
import Signuppage from './page/Signup/Signuppage'
import Homepage from './page/Home/Homepage'

function App() {
  return (
    <>
      <div className = 'p-4 h-screen flex items-center justify-center '>
        {/* <Signuppage/> */}
        <Homepage/>
      </div>
    </>
  )
}

export default App
