import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = import.meta.env.VITE_BASE_URL

const AddSong = () => {
  const [image, setImage] = useState(false)
  const [song, setSong] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [album, setAlbum] = useState("none")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [albumData, setAlbumData] = useState([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/albums/list`)
      if (response.data.success) setAlbumData(response.data.albums)
      else toast.error("Failed to load albums")
    } catch (error) {
      toast.error("Server error")
    }
  }

  useEffect(() => { fetchAlbums() }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!song || !image) { toast.error("Please upload both song and image"); return }

    try {
      setLoading(true)
      setProgress(0)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('album', album)
      formData.append('audio', song)
      formData.append('image', image)

      const token = localStorage.getItem("adminToken")

      const response = await axios.post(`${url}/api/songs/add`, formData, {
        headers: { 'Authorization': `Bearer ${token}` },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total))
        }
      })

      if (response.data.success) {
        toast.success("Song Added Successfully 🎉")
        setName(""); setDesc(""); setAlbum("none"); setImage(false); setSong(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong ❌")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return loading ? (
    <div className='flex items-center justify-center h-[80vh] w-full'>
      <div className='flex flex-col items-center gap-6'>
        <div className='w-12 h-12 border-4 border-green-900 rounded-full border-t-green-500 animate-spin'></div>
        <p className='font-semibold text-green-400'>Uploading to Cloudinary... {progress}%</p>
        <div className='w-64 h-1.5 bg-green-900/40 rounded-full overflow-hidden'>
          <div
            className='h-full transition-all duration-300 bg-green-500 rounded-full'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-xs text-white/30'>This may take a moment for audio files</p>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center w-full py-10'>
  <div className='w-[90%] max-w-4xl flex flex-col items-center'>
      <h2 className='mb-6 text-xl font-bold text-white'>Add New Song</h2>

      <form onSubmit={onSubmitHandler} className='flex flex-col w-full gap-6'>

        <div className='flex flex-wrap justify-center gap-10'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium text-white/60'>Song file</p>
            <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' hidden />
            <label htmlFor="song" className="relative cursor-pointer">
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 ${song ? 'border-green-500 bg-green-500/10' : 'border-white/20 bg-white/5 hover:border-green-500/50 hover:bg-white/10'}`}>
                {song ? (
                  <>
                    <svg className='w-8 h-8 text-green-400' fill='currentColor' viewBox='0 0 24 24'><path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/></svg>
                    <span className='mt-1 text-xs text-green-400'>Ready</span>
                  </>
                ) : (
                  <>
                    <svg className='w-8 h-8 text-white/30' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'/></svg>
                    <span className='mt-1 text-xs text-white/30'>Upload</span>
                  </>
                )}
              </div>
            </label>
            {song && <p className='text-xs text-green-400 truncate max-w-[96px]'>{song.name}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium text-white/60'>Cover image</p>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept='image/*' hidden />
            <label htmlFor="image" className="cursor-pointer">
              <div className={`w-24 h-24 rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all duration-200 ${image ? 'border-green-500' : 'border-white/20 bg-white/5 hover:border-green-500/50 hover:bg-white/10'}`}>
                {image ? (
                  <img src={URL.createObjectURL(image)} className='object-cover w-full h-full' alt="" />
                ) : (
                  <div className='flex flex-col items-center'>
                    <svg className='w-8 h-8 text-white/30' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>
                    <span className='mt-1 text-xs text-white/30'>Upload</span>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-white/60'>Song name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all'
            placeholder='Enter song name'
            type='text'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-white/60'>Description <span className='text-white/30'>(optional)</span></label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all'
            placeholder='Enter description'
            type='text'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-white/60'>Album</label>
          <select
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition-all'
          >
            <option value="none" className='bg-black'>None</option>
            {albumData.map((item) => (
              <option key={item._id} value={item._id} className='bg-black'>{item.name}</option>
            ))}
          </select>
          {albumData.length === 0 && <p className="text-xs text-white/30">No albums available</p>}
        </div>

        <button
          className='w-full py-3 font-bold text-black transition-all duration-200 bg-green-500 rounded-lg hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25'
          type="submit"
        >
          ADD SONG
        </button>

      </form>
    </div>
    </div>
  )
}

export default AddSong