import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../index.css'

const UserLogin = () => {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="top-bar">
        <span>Don't have an account?</span>
        <button className="signup-btn" onClick={() => navigate("/user_signup")}>
          Sign Up
        </button>
      </div>
      <h1>User Login</h1>
      <h2>Relieve stress by listening to Streamify. Have a good time.</h2>
      <LoginForm role="user" />
      <button className="back-btn" onClick={() => navigate("/login")}>← Back</button>
    </div>
  )
}

export default UserLogin