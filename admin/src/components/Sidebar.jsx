import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: "/admin/addSong",   icon: assets.add_song,   label: "Add Song" },
  { to: "/admin/addAlbum",  icon: assets.add_album,  label: "Add Album" },
  { to: "/admin/listSong",  icon: assets.song_icon,  label: "Songs" },
  { to: "/admin/listAlbum", icon: assets.album_icon, label: "Albums" },
]

const Sidebar = () => {
  return (
    <>
      
      <div className='hidden sm:flex
min-h-screen
w-[220px]
flex-shrink-0
flex-col
border-r border-green-500/20
bg-gradient-to-b
from-black
via-green-800/40
to-black
shadow-[0_0_25px_rgba(34,197,94,0.08)]
backdrop-blur-xl'>

        <div className='px-6 py-6 border-b border-green-900/30'>
          <img src={assets.logo} className='w-[120px]' alt="" />
        </div>

        <div className='flex flex-col gap-1 mt-6 px-3'>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <img src={icon} className='w-5 opacity-80' alt="" />
              <p className='text-sm font-semibold'>{label}</p>
            </NavLink>
          ))}
        </div>

        <div className='mt-auto px-6 py-4 border-t border-green-500/30'>
          <p className='text-xs text-white/30 tracking-widest uppercase'>Streamify Admin</p>
        </div>
      </div>

     
      <div className='sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-green-900/40 px-2 py-2'>
        <div className='flex items-center justify-around'>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'text-white/40 hover:text-white/70'
                }`
              }
            >
              <img src={icon} className='w-5 opacity-80' alt="" />
              <span className='text-[10px] font-semibold'>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      
      <div className='sm:hidden h-[65px]' />
    </>
  )
}

export default Sidebar