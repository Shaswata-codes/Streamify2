import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/album/${id}`)}
      className='min-w-[160px] max-w-[160px] p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group relative'
    >
      <div className='relative overflow-hidden rounded-md shadow-lg'>
        <img
          className='w-full aspect-square object-cover rounded-md group-hover:scale-105 transition-transform duration-300'
          src={image}
          alt={name}
        />
       
        <div className='absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200'>
          <svg className='w-5 h-5 text-black ml-0.5' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z'/>
          </svg>
        </div>
      </div>
      <p className='mt-3 mb-1 font-bold text-sm text-white truncate'>{name}</p>
      <p className='text-xs text-white/50 truncate leading-relaxed'>{desc}</p>
    </div>
  )
}

export default AlbumItem