import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage   from "./pages/LoginPage";
import AdminLogin  from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";

import Sidebar   from "./components/Sidebar";
import Navbar    from "./components/Navbar";
import AddSong   from "./pages/AddSong";
import AddAlbum  from "./pages/AddAlbum";
import ListSong  from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";

export const url = 'http://localhost:4000';

const AdminLayout = () => {
  const [verified, setVerified] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken")
      if (!token) { setVerified(false); return }

      try {
        const res = await fetch(`${url}/api/admin/verify`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          setVerified(true)
        } else {
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminName")
          setVerified(false)
        }
      } catch {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminName")
        setVerified(false)
      }
    }
    verifyToken()
  }, [])

  if (verified === null) return (
    <div className='h-screen bg-black flex items-center justify-center'>
      <div className='w-8 h-8 border-4 border-green-900 rounded-full border-t-green-500 animate-spin'></div>
    </div>
  )

  if (!verified) return <Navigate to="/admin_login" />

  return (
    <div className="flex items-start min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-10 sm:pl-10 pr-5 sm:pr-10 pb-20 sm:pb-8">
          <Routes>
            <Route path="addSong"   element={<AddSong />} />
            <Route path="addAlbum"  element={<AddAlbum />} />
            <Route path="listSong"  element={<ListSong />} />
            <Route path="listAlbum" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/"             element={<LoginPage />} />
        <Route path="/admin_login"  element={<AdminLogin />} />
        <Route path="/admin_signup" element={<AdminSignUp />} />
        <Route path="/admin/*"      element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App