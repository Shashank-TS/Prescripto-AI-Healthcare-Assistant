import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import AllAppointments from './pages/Admin/AllAppointments'
import Doctorslist from './pages/Admin/Doctorslist'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import Home from './pages/Doctor/video-call/Home'
import Room from './pages/Doctor/video-call/Room'

const App = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isVideoCallPage = location.pathname.startsWith('/video-call/room');

  return (
    <div>
      {isAuthenticated ? (
        <>
          {/* Navbar only if not in video call page */}
          {!isVideoCallPage && (
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          )}

          <div className={`flex ${isVideoCallPage ? '' : 'items-start'} bg-[#F8F9FD] min-h-screen`}>
            {/* Sidebar only if not in video call page */}
            {!isVideoCallPage && (
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            )}

            {/* Main Content Area */}
            <div className="flex-1 w-full">
              <Routes>
                {/* admin routes */}
                <Route path="/" element={<></>} />
                <Route path="/admin-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/add-doctor" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
                <Route path="/all-appointments" element={<ProtectedRoute><AllAppointments /></ProtectedRoute>} />
                <Route path="/doctors-list" element={<ProtectedRoute><Doctorslist /></ProtectedRoute>} />

                {/* doctor routes */}
                <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
                <Route path="/doctor-appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
                <Route path="/doctor-profile" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />

                {/* video call routes */}
                <Route path="/video-call/:roomId" element={<Home />} />
                <Route path="/video-call/room/:id" element={<Room/>}/>
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-[#F8F9FD]">
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;


