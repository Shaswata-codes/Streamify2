import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = 'http://localhost:4000'

const AddSong = () => {

  const [image, setImage] = useState(false)
  const [song, setSong] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [album, setAlbum] = useState("none")
  const [loading, setLoading] = useState(false)
  const [albumData, setAlbumData] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!song || !image) {
      toast.error("Please upload both song and image")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('album', album)
      formData.append('audio', song)
      formData.append('image', image)

      const response = await axios.post(`${url}/api/songs/add`, formData)

      if (response.data.success) {
        toast.success("Song Added Successfully 🎉")

        // reset form
        setName("")
        setDesc("")
        setAlbum("none")
        setImage(false)
        setSong(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <div className='flex items-center justify-center h-[80vh] w-full'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 border-4 border-gray-300 rounded-full border-t-green-500 animate-spin'></div>
        <p className='text-lg font-medium text-gray-600'>Adding song...</p>
      </div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

      <div className='flex gap-8'>

        <div className='flex flex-col gap-4'>
          <p>Upload song</p>
          <input 
            onChange={(e)=>setSong(e.target.files[0])} 
            type="file" 
            id='song' 
            accept='audio/*' 
            hidden 
          />

          <label htmlFor="song" className="relative">
            <img 
              src={song ? assets.uploaded_song : assets.upload_song} 
              className='w-24 cursor-pointer' 
              alt="" 
            />

            {song && (
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                ✔
              </span>
            )}
          </label>

          {song && <p className="text-sm text-green-600">{song.name}</p>}
        </div>

        <div className='flex flex-col gap-4'>
          <p>Upload cover</p>
          <input 
            onChange={(e)=>setImage(e.target.files[0])} 
            type="file" 
            id="image" 
            accept='image/*' 
            hidden
          />

          <label htmlFor="image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              className='w-24 cursor-pointer' 
              alt="" 
            />
          </label>
        </div>

      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song name</p>
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500' 
          placeholder='Type here' 
          type='text' 
          required 
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song description</p>
        <input 
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500' 
          placeholder='Type here' 
          type='text' 
          required 
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select 
          value={album}
          onChange={(e)=>setAlbum(e.target.value)}
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>

        <button 
          className='text-base text-white bg-black px-14 py-2.5 cursor-pointer hover:bg-gray-800 transition' 
          type="submit"
        >
          ADD
        </button>
      </div>

    </form>
  )
}

export default AddSong