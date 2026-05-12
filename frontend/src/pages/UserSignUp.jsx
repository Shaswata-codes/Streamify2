import { useNavigate } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import '../index.css'

const UserSignUp = () => {
  const navigate = useNavigate()

  return (
    <div className="signup-page">
      <div className="top-bar">
        <span>Already have an account?</span>
        <button className="signup-btn" onClick={() => navigate("/user_login")}>
          Log In
        </button>
      </div>
      <h1>Create Account</h1>
      <h2>Relieve stress by listening to Streamify. Have a good time.</h2>
      <SignUpForm role="user" />
      <button className="back-btn" onClick={() => navigate("/user_login")}>← Back</button>
    </div>
  )
}

export default UserSignUp