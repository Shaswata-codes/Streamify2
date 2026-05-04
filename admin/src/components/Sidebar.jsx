import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw] text-white'>

      <img 
        src={assets.logo} 
        className='mt-5 w-[max(10vw,100px)] hidden sm:block hover:scale-105 transition' 
        alt="" 
      />
      <img 
        src={assets.logo_small} 
        className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block hover:scale-105 transition' 
        alt="" 
      />

      <div className='flex flex-col gap-4 mt-10'>

        <NavLink to="/addSong" className='flex items-center gap-3 p-3 text-gray-800 transition-all duration-200 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-200'>
          <img src={assets.add_song} className='w-5' alt="" />
          <p className='hidden font-medium sm:block'>Add Song</p>
        </NavLink>

        <NavLink to="/addAlbum" className='flex items-center gap-3 text-gray-200 p-3 rounded-lg cursor-pointer hover:bg-[#014d1a] transition-all duration-200'>
          <img src={assets.add_album} className='w-5' alt="" />
          <p className='hidden sm:block'>Add Album</p>
        </NavLink>

        <NavLink to="/listSong" className='flex items-center gap-3 text-gray-200 p-3 rounded-lg cursor-pointer hover:bg-[#014d1a] transition-all duration-200'>
          <img src={assets.song_icon} className='w-5' alt="" />
          <p className='hidden sm:block'>List Song</p>
        </NavLink>

        <NavLink to="/listAlbum" className='flex items-center gap-3 text-gray-200 p-3 rounded-lg cursor-pointer hover:bg-[#014d1a] transition-all duration-200'>
          <img src={assets.album_icon} className='w-5' alt="" />
          <p className='hidden sm:block'>List Album</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar