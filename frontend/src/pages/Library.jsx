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
      const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/api/user/liked-songs/${userId}`
)
      if (response.data.success) setLikedSongs(response.data.likedSongs)
    } catch (error) { console.log(error) }
  }

  return (
    <div className='pb-8 text-white'>
       <div className='flex items-center gap-2 mt-2 mb-6'>
        <button onClick={() => navigate('/dashboard')} className='flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full text-white/50 hover:text-white hover:bg-white/10'>
          <img className='w-4' src={assets.home_icon} alt="" />
          Home
        </button>
        <button onClick={() => navigate('/search')}  className='flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-full bg-white/15'>
          <img className='w-4' src={assets.search_icon} alt="" />
          Search
        </button>
        <button onClick={() => navigate('/library')} className='flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full text-white/50 hover:text-white hover:bg-white/10'>
          <img className='w-4' src={assets.stack_icon} alt="" />
          Library
        </button>
      </div>

     
      <div className='flex items-end gap-6 p-8 pt-6 mt-4 bg-gradient-to-b from-purple-800/60 to-transparent rounded-xl'>
        <div className='flex items-center justify-center flex-shrink-0 w-40 h-40 rounded-md shadow-2xl bg-gradient-to-br from-indigo-700 to-blue-300'>
          <h1 className='text-5xl'>❤️</h1>
        </div>
        <div>
          <p className='text-xs font-bold tracking-wider uppercase text-white/60'>Playlist</p>
          <h1 className='mt-1 mb-3 text-5xl font-black'>Liked Songs</h1>
          <p className='text-sm text-white/60'>{likedSongs.length} songs</p>
        </div>
      </div>

   
      <div className='px-8 mt-6 mb-4'>
        <div className='flex items-center justify-center transition bg-green-500 rounded-full shadow-lg cursor-pointer w-14 h-14 hover:scale-105 active:scale-95'>
          <svg className='w-6 h-6 ml-1 text-black' fill='currentColor' viewBox='0 0 24 24'>
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
            <span className='text-sm text-gray-400'>{index + 1}</span>
            <div className='flex items-center min-w-0 gap-4'>
              <img src={song.image} className='flex-shrink-0 object-cover w-10 h-10 rounded shadow-md' alt="" />
              <div className='truncate'>
                <p className='text-sm font-semibold truncate group-hover:text-green-500'>{song.name}</p>
                <p className='text-xs text-gray-400 truncate'>{song.desc}</p>
              </div>
            </div>
            <p className='hidden text-sm text-gray-400 truncate md:block'>{song.desc}</p>
          </div>
        )) : (
          <div className='py-16 text-center text-white/30'>
            <p className='mb-4 text-4xl'>🎵</p>
            <p className='font-semibold'>No liked songs yet</p>
            <p className='mt-1 text-sm'>Songs you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Library