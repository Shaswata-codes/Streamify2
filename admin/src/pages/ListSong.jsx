import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = import.meta.env.VITE_BASE_URL

const ListSong = () => {

  const [data, setData] = useState([])

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/songs/list`)

      if (response.data.success) {
        setData(response.data.songs)
      } else {
        toast.error("Error fetching songs")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/songs/remove`, { id })

      if (response.data.success) {
        toast.success("Song deleted")
        fetchSongs()
      } else {
        toast.error("Delete failed")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <div className='w-full'>
      
      <p className='mb-4 text-xl font-bold'>All Songs List</p>

      <div className='grid grid-cols-[1fr_2fr_2fr_1fr] gap-4 bg-gray-200 p-3 font-semibold'>
        <p>Image</p>
        <p>Name</p>
        <p>Album</p>
        <p>Action</p>
      </div>

      {data.map((item, index) => (
        <div 
          key={index} 
          className='grid grid-cols-[1fr_2fr_2fr_1fr] gap-4 items-center p-3 border-b'
        >
          <img src={item.image} className='w-12 rounded' alt="" />
          <p>{item.name}</p>
          <p>{item.album}</p>

          <button 
            onClick={() => removeSong(item._id)}
            className='text-red-500 hover:underline'
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  )
}

export default ListSong