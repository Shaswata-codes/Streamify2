import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  const { albumsData } = useContext(PlayerContext)
  const location = useLocation()

  const isAlbum = location.pathname.includes('/album/')
  const id = isAlbum ? location.pathname.split('/').pop() : null

  const albumData = albumsData.find(item => item._id === id)

  const bgStyle = {
    background: isAlbum && albumData
      ? `linear-gradient(180deg, ${albumData.bgColor}cc 0%, ${albumData.bgColor}44 30%, #1a1a2e 60%, #121212 100%)`
      : 'linear-gradient(180deg, #1e1e2e 0%, #181820 40%, #121212 100%)'
  }

  return (
    <div
    style={bgStyle}
    className='w-full h-[100%] m-2 px-6 pt-4 rounded-xl text-white overflow-y-auto overflow-x-hidden lg:w-[75%] transition-all duration-700 relative'
  >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='album/:id' element={<DisplayAlbum />} />

      </Routes>
    </div>
  )
}

export default Display