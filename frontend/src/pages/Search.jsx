import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Search = () => {
  const { playWithId } = useContext(PlayerContext)
  const navigate = useNavigate()
  const [songs, setSongs] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => { fetchSongs() }, [])

  const fetchSongs = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/songs/list')
      if (res.data.success) setSongs(res.data.songs)
    } catch (error) { console.log(error) }
  }

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase())
  )

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

     
      <div className='sticky top-0 z-10 bg-[#121212]/80 backdrop-blur-md py-4 mb-6 mt-4'>
        <div className='relative max-w-md'>
          <svg className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input
            type="text"
            placeholder='What do you want to listen to?'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full pl-12 pr-4 py-3 rounded-full bg-white text-black font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all'
          />
        </div>
      </div>

      {query ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredSongs.length > 0 ? filteredSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => playWithId(song._id)}
              className='group flex items-center gap-4 bg-[#181818] hover:bg-[#282828] p-4 rounded-lg transition duration-300 cursor-pointer'
            >
              <img src={song.image} className='w-16 h-16 rounded shadow-lg object-cover' alt={song.name} />
              <div className='flex-1 truncate'>
                <p className='font-bold text-base truncate group-hover:text-green-500'>{song.name}</p>
                <p className='text-gray-400 text-sm truncate'>{song.desc}</p>
              </div>
            </div>
          )) : (
            <p className='text-white/40 col-span-3 text-center py-10'>No songs found for "{query}"</p>
          )}
        </div>
      ) : (
        <>
          <h2 className='text-2xl font-bold mb-6'>Browse all</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {[
              { label: 'Podcasts',     colors: 'from-pink-600 to-indigo-600' },
              { label: 'Made For You', colors: 'from-green-600 to-blue-700' },
              { label: 'Charts',       colors: 'from-yellow-500 to-orange-600' },
              { label: 'New Releases', colors: 'from-purple-600 to-pink-600' },
              { label: 'Pop',          colors: 'from-blue-600 to-cyan-500' },
            ].map((cat, i) => (
              <div
                key={i}
                className={`h-48 p-4 rounded-xl font-bold text-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br ${cat.colors}`}
              >
                {cat.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Search