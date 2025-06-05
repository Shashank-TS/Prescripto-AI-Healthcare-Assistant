import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors_Home from './pages/Doctors_Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import All_Doctors from './pages/All_Doctors'
import AI_chatbot from './pages/AI_chatbot'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './components/context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PaymentSuccess from './pages/PaymentSuccess'
import SymptomChecker from './components/SymptomChecker/SymptomChecker'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[6%]'>
      
      <AuthProvider>

          <ScrollToTop/>
          <Navbar/>
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctor_home' element={<Doctors_Home />} />
            <Route path='/all_doctors' element={<All_Doctors/>} />
            <Route path='doctor_home/all_doctors/:speciality' element={<All_Doctors/>} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/contact' element={<Contact/>} />           
            <Route path='/appointment/:docId' element={<Appointment/>} />
            
            <Route path='/ai-chatbot' element={<AI_chatbot/>} />
            <Route path='/symptom-checker' element={<SymptomChecker/>} />



            <Route path='/:appointmentId/success' element={<PaymentSuccess/>}/>

            <Route path='/my-appointments' element={<ProtectedRoute><MyAppointments/></ProtectedRoute>} />
            <Route path='/my-profile' element={<ProtectedRoute><Myprofile/></ProtectedRoute>} />   
          </Routes>

          <Footer/>

      </AuthProvider>
 
    </div>
  )
}

export default App
