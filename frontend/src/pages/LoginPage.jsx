import { useNavigate } from 'react-router-dom'
import '../index.css'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    const token = localStorage.getItem("userToken")
    navigate(token ? "/dashboard" : "/user_login")
  }

  return (
    <div className="login-page">
      <h1>Welcome Back</h1>
      <h2>Relieve stress by listening to Streamify. Have a good time.</h2>
      <div className="role-selector">
        <button className="role-btn" onClick={handleStart}>
          <span className="role-icon">👤</span>
          <span>Get Started</span>
        </button>
      </div>
    </div>
  )
}

export default LoginPage