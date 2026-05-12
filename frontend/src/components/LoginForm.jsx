import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { assets } from '../assets/assets'

export default function LoginForm({ role }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = role === "admin" ? "/api/admin/login" : "/api/user/login"

    try {
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log("LOGIN RESPONSE:", data)

      if (res.ok && data.token) {
        const tokenKey = role === "admin" ? "adminToken" : "userToken"
        const nameKey = role === "admin" ? "adminName" : "userName"
        localStorage.setItem(tokenKey, data.token)
localStorage.setItem(nameKey, data.name)



if (role !== "admin") {
  localStorage.setItem("userId", data._id)
}
        navigate(role === "admin" ? "/admin/dashboard" : "/dashboard")
      } else {
        setError(data.message || "No token received")
      }

    } catch (err) {
      setError("Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center gap-10">

      <div className="flex items-center justify-center">
        <img
          src={assets.logocopy}
          className="w-40 h-40 object-contain drop-shadow-2xl"
          alt="Streamify"
        />
      </div>
    <form className="login-form" onSubmit={handleSubmit}>

      {error && <p className="error-msg">{error}</p>}

      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@gmail.com"
          required
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>

    </form>
    </div>
  )
}