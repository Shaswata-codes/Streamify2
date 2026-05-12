import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  const name = localStorage.getItem("userName") || "User"
  const firstLetter = name.charAt(0).toUpperCase()

  const handleLogout = () => {

    localStorage.removeItem("userToken")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")

    navigate("/user_login")
  }

  return (

    <div className="sticky top-0 z-50 w-full bg-[#121212]/95 backdrop-blur-md px-6 py-3 border-b border-white/5">

     
      <div className="flex items-center justify-between w-full">

       
        <div className="flex items-center gap-2">

          <img
            onClick={() => navigate(-1)}
            className="w-8 h-8 p-2 bg-black/60 hover:bg-white/10 rounded-full cursor-pointer transition-all duration-200"
            src={assets.arrow_left}
            alt=""
          />

          <img
            onClick={() => navigate(1)}
            className="w-8 h-8 p-2 bg-black/60 hover:bg-white/10 rounded-full cursor-pointer transition-all duration-200"
            src={assets.arrow_right}
            alt=""
          />

        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-3 relative'>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-400/50 rounded-lg transition-all duration-200'
          >
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>

            Logout
          </button>

         
          <div className='relative'>

            <div
              onClick={() => setShowMenu(!showMenu)}
              className='w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center cursor-pointer hover:bg-purple-500/30 transition-all duration-200'
            >
              <span className='text-purple-400 text-sm font-bold'>
                {firstLetter}
              </span>
            </div>

            {showMenu && (

              <div className='absolute right-0 top-12 w-52 bg-[#181818] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden'>

                <div className='px-4 py-3 border-b border-white/10'>
                  <p className='text-white text-sm font-semibold'>
                    {name}
                  </p>

                  <p className='text-white/40 text-xs'>
                    Streamify User
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className='w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-150 text-sm'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>

                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-2 mt-4">

        <p className="px-4 py-1 text-black bg-white cursor-pointer rounded-full text-sm font-semibold shadow-md">
          All
        </p>

        <p className="px-4 py-1 bg-white/10 hover:bg-white/15 text-white/80 cursor-pointer rounded-full text-sm transition-all duration-200">
          Music
        </p>

        <p className="px-4 py-1 bg-white/10 hover:bg-white/15 text-white/80 cursor-pointer rounded-full text-sm transition-all duration-200">
          Podcasts
        </p>

      </div>

    </div>
  )
}

export default Navbar