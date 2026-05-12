import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const url = 'http://localhost:4000'

const DisplayHome = () => {
  const { songData, setSongData, albumsData, setAlbumsData } = useContext(PlayerContext)
  const navigate = useNavigate()

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${url}/api/songs/list`)
      if (res.data.success) setSongData(res.data.songs)
      else toast.error("Failed to load songs")
    } catch (err) {
      toast.error("Server error")
    }
  }

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${url}/api/albums/list`)
      if (res.data.success) setAlbumsData(res.data.albums)
      else toast.error("Failed to load albums")
    } catch (err) {
      toast.error("Server error")
    }
  }

  useEffect(() => {
    fetchSongs()
    fetchAlbums()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className='pt-4 pb-8 px-4'>
      <Navbar />

      
      <div className='relative mt-4 mb-8 rounded-2xl overflow-hidden flex items-center justify-between px-8 py-6'
        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1f12 50%, #121212 100%)' }}
      >
        {/* Glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-green-900/20 pointer-events-none' />
        
        <div className='relative z-10'>
          <p className='text-white/40 text-sm uppercase tracking-widest mb-1'>Welcome to</p>
          <h1 className='text-4xl font-bold text-white mb-2'>{getGreeting()}</h1>
          <p className='text-white/50 text-sm'>Discover your next favorite track on <span className='text-green-400 font-semibold'>Streamify</span></p>
        </div>

        <img
          src={assets.logocopy}
          className='relative z-10 w-28 h-28 object-contain opacity-90 drop-shadow-2xl'
          alt="Streamify"
        />
      </div>

      {/* Quick picks grid */}
      {albumsData?.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mb-8'>
          {albumsData.slice(0, 6).map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/dashboard/album/${item._id}`)}
              className='flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-md cursor-pointer transition-all duration-200 overflow-hidden group'
            >
              <img src={item.image} className='w-14 h-14 object-cover flex-shrink-0' alt={item.name} />
              <span className='font-bold text-sm text-white truncate pr-2'>{item.name}</span>
            </div>
          ))}
        </div>
      )}

     
      {/* Featured Charts */}
      <div className='mb-8'>
  <div className='flex items-center justify-between mb-4'>
    <h2 className='text-xl font-bold text-white'>Featured Charts</h2>
    <span className='text-xs font-bold text-white/50 hover:text-white cursor-pointer uppercase tracking-widest'>Show all</span>
  </div>
  <div className='grid grid-cols-3 gap-4'>
    {albumsData?.map((item) => (
      <AlbumItem key={item._id} name={item.name} desc={item.desc} image={item.image} id={item._id} />
    ))}
  </div>
</div>

      {/* Today's Biggest Hits */}
      <div className='mb-8'>
  <div className='flex items-center justify-between mb-4'>
    <h2 className='text-xl font-bold text-white'>Today's Biggest Hits</h2>
    <span className='text-xs font-bold text-white/50 hover:text-white cursor-pointer uppercase tracking-widest'>Show all</span>
  </div>
  <div className='grid grid-cols-3 gap-4'>
    {songData?.map((item) => (
      <SongItem key={item._id} name={item.name} desc={item.desc} image={item.image} id={item._id} />
    ))}
  </div>
</div>

    </div>
  )
}

export default DisplayHome