import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = import.meta.env.VITE_BASE_URL



const AddAlbum = () => {
  const [image, setImage] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [bgColor, setBgColor] = useState("#1DB954")
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!image) { toast.error("Please upload album cover"); return }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('bgColor', bgColor)
      formData.append('image', image)
      
      const token = localStorage.getItem("adminToken")
      const response = await axios.post(`${url}/api/albums/add`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }  
      })      

      if (response.data.success) {
        toast.success("Album Added 🎉")
        setName(""); setDesc(""); setBgColor("#1DB954"); setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <div className='flex items-center justify-center h-[80vh] w-full'>
      <div className='flex flex-col items-center gap-5'>
        <div className='border-4 border-green-900 rounded-full w-14 h-14 border-t-green-500 animate-spin'></div>
        <p className='text-lg font-semibold text-green-400'>
          Adding album...
        </p>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center w-full py-10'>
      <div className='w-[90%] max-w-4xl flex flex-col items-center'>
  
        <h2 className='mb-10 text-4xl font-bold text-center text-white'>
          Add New Album
        </h2>
  
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col w-full gap-8'
        >
  
        
          <div className='flex flex-col items-center gap-3'>
            <p className='text-base font-medium text-white/60'>
              Cover image
            </p>
  
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept='image/*'
              hidden
            />
  
            <label htmlFor="image" className="cursor-pointer">
              <div className={`w-44 h-44 rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all duration-200 ${
                image
                  ? 'border-green-500 shadow-lg shadow-green-500/20'
                  : 'border-white/20 bg-white/5 hover:border-green-500/50 hover:bg-white/10'
              }`}>
  
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className='object-cover w-full h-full'
                    alt=""
                  />
                ) : (
                  <div className='flex flex-col items-center gap-2'>
                    <svg
                      className='w-14 h-14 text-white/30'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
  
                    <span className='text-sm text-white/40'>
                      Upload cover
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>
  
          {/* Album Name */}
          <div className='flex flex-col gap-3'>
            <label className='text-base font-medium text-white/60'>
              Album name
            </label>
  
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-6 py-4 text-lg text-white transition-all border bg-white/5 border-white/10 rounded-xl placeholder-white/20 focus:outline-none focus:border-green-500 focus:bg-white/10'
              placeholder='Enter album name'
              type='text'
              required
            />
          </div>
  
          {/* Description */}
          <div className='flex flex-col gap-3'>
            <label className='text-base font-medium text-white/60'>
              Description
            </label>
  
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='w-full px-6 py-4 text-lg text-white transition-all border bg-white/5 border-white/10 rounded-xl placeholder-white/20 focus:outline-none focus:border-green-500 focus:bg-white/10'
              placeholder='Enter description'
              type='text'
              required
            />
          </div>
  
          {/* Color */}
          <div className='flex flex-col gap-3'>
            <label className='text-base font-medium text-white/60'>
              Background color
            </label>
  
            <div className='flex flex-wrap items-center gap-5'>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className='w-16 bg-transparent border cursor-pointer h-14 rounded-xl border-white/10'
              />
  
              <span className='font-mono text-base text-white/50'>
                {bgColor}
              </span>
  
              <div
                className='w-12 h-12 border shadow-lg rounded-xl border-white/10'
                style={{ backgroundColor: bgColor }}
              />
            </div>
          </div>
  
          {/* Button */}
          <button
            className='w-full py-5 text-lg font-bold text-black transition-all duration-200 bg-green-500 hover:bg-green-400 rounded-xl hover:shadow-lg hover:shadow-green-500/25'
            type="submit"
          >
            ADD ALBUM
          </button>
  
        </form>
      </div>
    </div>
  )
}

export default AddAlbum