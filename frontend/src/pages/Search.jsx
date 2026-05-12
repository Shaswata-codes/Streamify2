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
      
      const res = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/api/songs/list`
)
      if (res.data.success) setSongs(res.data.songs)
    } catch (error) { console.log(error) }
  }

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase())
  )

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

     
      <div className='sticky top-0 z-10 bg-[#121212]/80 backdrop-blur-md py-4 mb-6 mt-4'>
        <div className='relative max-w-md'>
          <svg className='absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input
            type="text"
            placeholder='What do you want to listen to?'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full py-3 pl-12 pr-4 font-medium text-black transition-all bg-white rounded-full outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>
      </div>

      {query ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredSongs.length > 0 ? filteredSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => playWithId(song._id)}
              className='group flex items-center gap-4 bg-[#181818] hover:bg-[#282828] p-4 rounded-lg transition duration-300 cursor-pointer'
            >
              <img src={song.image} className='object-cover w-16 h-16 rounded shadow-lg' alt={song.name} />
              <div className='flex-1 truncate'>
                <p className='text-base font-bold truncate group-hover:text-green-500'>{song.name}</p>
                <p className='text-sm text-gray-400 truncate'>{song.desc}</p>
              </div>
            </div>
          )) : (
            <p className='col-span-3 py-10 text-center text-white/40'>No songs found for "{query}"</p>
          )}
        </div>
      ) : (
        <>
          <h2 className='mb-6 text-2xl font-bold'>Browse all</h2>
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'>
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