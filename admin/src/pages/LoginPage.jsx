import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <h1>Welcome Back</h1>
      <h2>Manage your music on Streamify</h2>
     
      <div className="role-selector">
        
        <button className="role-btn" onClick={() => navigate("/admin_login")}>
          <span className="role-icon">🛡️</span>
          <span>Get Started</span>
        </button>
      </div>
    </div>
  )
}

export default LoginPage