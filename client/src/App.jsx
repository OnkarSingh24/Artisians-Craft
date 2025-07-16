import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword'
import Verifyaccount from './pages/Verifyaccount'
import Register from './pages/Register'
import Registerasseller from './pages/Registerasseller'


const App = () => {
  return (
    <div >  
    <Routes>
      
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Verifyaccount' element={<Verifyaccount/>}/>
      <Route path='/Resetpassword' element={<Resetpassword/>}/>
      <Route path='/Registerasseller' element={<Registerasseller/>}/>
      
      


      </Routes>   
    </div>
  )
}

export default App
 //home page add krna hai 
