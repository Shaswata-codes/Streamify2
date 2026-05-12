import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Library = () => {
  const { playWithId } = useContext(PlayerContext)
  const navigate = useNavigate()
  const [likedSongs, setLikedSongs] = useState([])

  useEffect(() => { fetchLikedSongs() }, [])

  const fetchLikedSongs = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const response = await axios.get(`http://localhost:4000/api/user/liked-songs/${userId}`)
      if (response.data.success) setLikedSongs(response.data.likedSongs)
    } catch (error) { console.log(error) }
  }

  return (
    <div className='pb-8 text-white'>
       <div className='flex items-center gap-2 mb-6 mt-2'>
        <button onClick={() => navigate('/dashboard')} className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200'>
          <img className='w-4' src={assets.home_icon} alt="" />
          Home
        </button>
        <button onClick={() => navigate('/search')}  className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/15 text-white'>
          <img className='w-4' src={assets.search_icon} alt="" />
          Search
        </button>
        <button onClick={() => navigate('/library')} className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200'>
          <img className='w-4' src={assets.stack_icon} alt="" />
          Library
        </button>
      </div>

     
      <div className='bg-gradient-to-b from-purple-800/60 to-transparent p-8 pt-6 flex items-end gap-6 rounded-xl mt-4'>
        <div className='w-40 h-40 shadow-2xl bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center rounded-md flex-shrink-0'>
          <h1 className='text-5xl'>❤️</h1>
        </div>
        <div>
          <p className='text-xs font-bold uppercase tracking-wider text-white/60'>Playlist</p>
          <h1 className='text-5xl font-black mt-1 mb-3'>Liked Songs</h1>
          <p className='text-white/60 text-sm'>{likedSongs.length} songs</p>
        </div>
      </div>

   
      <div className='px-8 mt-6 mb-4'>
        <div className='bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 cursor-pointer shadow-lg'>
          <svg className='w-6 h-6 text-black ml-1' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z'/>
          </svg>
        </div>
      </div>

      
      <div className='grid grid-cols-[50px_1fr_1fr] px-8 py-2 border-b border-white/10 text-gray-400 text-xs uppercase tracking-widest mb-2'>
        <span>#</span>
        <span>Title</span>
        <span className='hidden md:block'>Description</span>
      </div>

    
      <div className='flex flex-col px-4'>
        {likedSongs.length > 0 ? likedSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => playWithId(song._id)}
            className='grid grid-cols-[50px_1fr_1fr] items-center gap-4 px-4 py-2 rounded-md hover:bg-white/10 group transition duration-200 cursor-pointer'
          >
            <span className='text-gray-400 text-sm'>{index + 1}</span>
            <div className='flex items-center gap-4 min-w-0'>
              <img src={song.image} className='w-10 h-10 rounded shadow-md object-cover flex-shrink-0' alt="" />
              <div className='truncate'>
                <p className='font-semibold group-hover:text-green-500 truncate text-sm'>{song.name}</p>
                <p className='text-xs text-gray-400 truncate'>{song.desc}</p>
              </div>
            </div>
            <p className='text-gray-400 text-sm hidden md:block truncate'>{song.desc}</p>
          </div>
        )) : (
          <div className='text-center py-16 text-white/30'>
            <p className='text-4xl mb-4'>🎵</p>
            <p className='font-semibold'>No liked songs yet</p>
            <p className='text-sm mt-1'>Songs you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Library