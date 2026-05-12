import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../index.css'

export default function AdminLogin() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) navigate("/admin/addSong")
  }, [])

  return (
    <div className="login-page">
      <div className="top-bar">
        <span>Don't have an account?</span>
        <button className="signup-btn" onClick={() => navigate("/admin_signup")}>
          Sign Up
        </button>
      </div>
      <h1>Admin Login</h1>
      <LoginForm role="admin" />
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
    </div>
  )
}