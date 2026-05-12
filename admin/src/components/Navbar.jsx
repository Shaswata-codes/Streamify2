import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const name = localStorage.getItem("adminName") || "A"
  const firstLetter = name.charAt(0).toUpperCase()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminName")
    navigate("/admin_login")
  }

  return (
    <div className='w-full px-6 py-4 flex items-center justify-between bg-black border-b border-green-900/40'>
      <div className='flex items-center gap-3'>
        <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
        <p className='text-white font-bold tracking-widest uppercase text-sm'>Admin Panel</p>
      </div>

      <div className='flex items-center gap-3 relative'>

       
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-400/50 rounded-lg transition-all duration-200'
        >
          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          Logout
        </button>

       
        <div className='relative'>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className='w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center cursor-pointer hover:bg-green-500/30 transition-all duration-200'
          >
            <span className='text-green-400 text-xs font-bold'>{firstLetter}</span>
          </div>

        
          {showMenu && (
            <div className='absolute right-0 top-10 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden'>
              <div className='px-4 py-3 border-b border-white/10'>
                <p className='text-white text-sm font-semibold'>{name}</p>
                <p className='text-white/30 text-xs'>Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-150 text-sm'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar