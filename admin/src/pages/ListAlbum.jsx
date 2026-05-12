import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = 'http://localhost:4000'

const ListAlbum = () => {
  const [data, setData] = useState([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/albums/list`)
      if (response.data.success) setData(response.data.albums)
      else toast.error("Failed to fetch albums")
    } catch (error) {
      toast.error("Server error")
    }
  }

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/albums/remove`, { id })
      if (response.data.success) { toast.success("Album deleted"); fetchAlbums() }
      else toast.error("Delete failed")
    } catch (error) {
      toast.error("Server error")
    }
  }

  useEffect(() => { fetchAlbums() }, [])

  return (
    <div className='w-full'>
      <h2 className='text-xl font-bold text-white mb-6'>All Albums</h2>

      <div className='rounded-xl overflow-hidden border border-white/10'>
        <div className='grid grid-cols-[auto_1fr_auto_auto] gap-4 bg-white/5 px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-semibold'>
          <p>Cover</p>
          <p>Name</p>
          <p>Color</p>
          <p>Action</p>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-4 py-3 border-t border-white/5 hover:bg-white/5 transition-colors duration-150'
          >
            <img src={item.image} className='w-12 h-12 rounded-lg object-cover' alt="" />
            <p className='text-white font-medium truncate'>{item.name}</p>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 rounded border border-white/20' style={{ backgroundColor: item.bgColor }}></div>
              <span className='text-white/40 text-xs font-mono hidden sm:block'>{item.bgColor}</span>
            </div>
            <button
              onClick={() => removeAlbum(item._id)}
              className='text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-3 py-1.5 rounded-lg transition-all duration-200'
            >
              Delete
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className='px-4 py-10 text-center text-white/30 text-sm'>No albums found</div>
        )}
      </div>
    </div>
  )
}

export default ListAlbum