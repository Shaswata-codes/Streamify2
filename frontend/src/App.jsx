import React, { useContext, useEffect,useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PlayerContext } from './context/PlayerContext'

import SideBar    from './components/Sidebar'
import Player     from './components/Player'
import Display    from './components/Display'
import LoginPage  from './pages/LoginPage'
import UserLogin  from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Search from './pages/Search'
import Library from './pages/Library'

const ProtectedRoute = ({ children }) => {

  const [isValid, setIsValid] = useState(null)

  useEffect(() => {

    const verifyToken = async () => {

      const token = localStorage.getItem("userToken")

      if (!token) {
        setIsValid(false)
        return
      }

      try {

        const res = await fetch(
          "http://localhost:4000/api/user/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (res.ok) {

          setIsValid(true)

        } else {

          localStorage.removeItem("userToken")
          localStorage.removeItem("userName")
          localStorage.removeItem("userId")

          setIsValid(false)
        }

      } catch (error) {

        setIsValid(false)
      }
    }

    verifyToken()

  }, [])

  if (isValid === null) {
    return <div className="text-white">Loading...</div>
  }

  return isValid ? children : <Navigate to="/user_login" />
}

const PlayerApp = () => {
  const { audioRef, track, setTime } = useContext(PlayerContext)

  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return

    const updateTime = () => {
      setTime({
        currentTime: {
          minute: Math.floor(audio.currentTime / 60),
          second: Math.floor(audio.currentTime % 60)
        },
        totalTime: {
          minute: Math.floor(audio.duration / 60) || 0,
          second: Math.floor(audio.duration % 60) || 0
        }
      })
    }

    audio.addEventListener("timeupdate", updateTime)
    return () => audio.removeEventListener("timeupdate", updateTime)
  }, [audioRef, setTime])

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex pt-[60px] lg:pt-0'>
        <SideBar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track?.file || ""} preload="auto" />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/user_signup" element={<UserSignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <PlayerApp />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App