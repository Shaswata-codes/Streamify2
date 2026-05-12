import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { assets } from '../assets/assets'

const DisplayAlbum = () => {

  const { id } = useParams()

  const { albumsData, songData, playWithId } = useContext(PlayerContext)

  const albumData = albumsData.find(item => item._id === id)

  const albumSongs = songData.filter(item => item.album === id)

  if (!albumData) return <div className='p-5 text-white'>Album not found</div>

  return (
    <>
      <Navbar />

      <div className='flex flex-col gap-8 mt-10 md:flex-row md:items-end'>
  <img className='w-48 rounded-lg shadow-2xl shadow-black/60 ring-1 ring-white/10' src={albumData.image} alt="" />

  <div className='flex flex-col'>
    <p className='text-xs uppercase tracking-widest text-white/50 font-semibold'>Playlist</p>
    <h2 className='mb-4 text-5xl font-bold md:text-7xl drop-shadow-lg'>{albumData.name}</h2>
    <h4 className='text-white/60 text-sm'>{albumData.desc}</h4>
    <p className='mt-1 text-sm text-white/50'>
      <img className='inline-block w-5 mr-1' src={assets.spotify_logo} alt="" />
      <b className='text-white'>Streamify</b> · {albumSongs.length} songs
    </p>
  </div>
</div>

<div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-xs uppercase tracking-widest text-white/40 border-b border-white/10 pb-2'>
  <p><b className='mr-4'>#</b>Title</p>
  <p>Album</p>
  <p className='hidden sm:block'>Date Added</p>
  <img className='w-4 m-auto' src={assets.clock_icon} alt="" />
</div>


      <hr />

      {albumSongs.map((item, index) => (
        <div
        onClick={() => playWithId(item._id)}
        key={item._id}
        className='grid grid-cols-3 sm:grid-cols-4 items-center gap-2 p-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-all duration-200 cursor-pointer group'
      >
        <p className='text-white flex items-center'>
          <b className='mr-4 text-white/40 group-hover:text-white/60 w-4 text-center'>{index + 1}</b>
          <img src={item.image} className='inline-block w-8 mr-3 rounded shadow-md' alt="" />
          <span className='truncate'>{item.name}</span>
        </p>
        <p className='text-[15px] truncate'>{albumData.name}</p>
        <p className='text-[15px] hidden sm:block'>Recently added</p>
        <p className='text-[15px] text-center'>{item.duration || "--"}</p>
      </div>
      ))}

      {albumSongs.length === 0 && (
        <p className='mt-5 text-gray-400'>No songs in this album</p>
      )}
    </>
  )
}

export default DisplayAlbum