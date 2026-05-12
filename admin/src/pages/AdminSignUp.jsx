import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import '../index.css'

const AdminSignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) navigate("/admin/addSong")
  }, [])

  return (
    <div className="signup-page">
      <div className="top-bar">
        <span>Already have an account?</span>
        <button className="signup-btn" onClick={() => navigate("/admin_login")}>
          Log In
        </button>
      </div>
      <h1>Admin Sign Up</h1>
      <SignUpForm role="admin" />
      <button className="back-btn" onClick={() => navigate("/admin_login")}>← Back</button>
    </div>
  )
}

export default AdminSignUp