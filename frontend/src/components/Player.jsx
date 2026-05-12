import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong
  } = useContext(PlayerContext)

  const [liked, setLiked] = useState(false)

  useEffect(() => {

    if (track) {

      const likedSongs =
        JSON.parse(localStorage.getItem("likedSongs")) || []

      const exists =
        likedSongs.find(item => item._id === track._id)

      setLiked(!!exists)
    }

  }, [track])

  const likeSong = async () => {

    try {

      const userId =
        localStorage.getItem("userId")

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/like-song`,
        {
          userId,
          songId: track._id
        }
      )

      if (response.data.success) {

        const isLiked =
          response.data.likedSongs.includes(track._id)

        setLiked(isLiked)
      }

    } catch (error) {

      console.log(error)
    }
  }

  const format = (num) =>
    String(num || 0).padStart(2, '0')

  return track ? (

    <div className='fixed bottom-0 left-0 w-full h-[80px] md:h-[90px] bg-black border-t border-white/10 text-white flex items-center justify-between px-3 md:px-5 z-50'>

      {/* LEFT */}
      <div className='flex items-center gap-3 w-[35%] min-w-0'>

        <img
          className='object-cover w-12 h-12 rounded-md'
          src={track?.image}
          alt=""
        />

        <div className='hidden min-w-0 sm:block'>

          <p className='text-sm font-semibold truncate'>
            {track?.name}
          </p>

          <p className='text-xs truncate text-white/50'>
            {track?.desc}
          </p>

        </div>

        <button
          onClick={likeSong}
          className={`text-xl transition-all ${
            liked
              ? 'text-green-400 scale-110'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {liked ? '♥' : '♡'}
        </button>

      </div>

      {/* CENTER */}
      <div className='flex flex-col items-center justify-center flex-1 max-w-[600px]'>

        {/* CONTROLS */}
        <div className='flex items-center gap-4 mb-1'>

          <img
            onClick={previous}
            className='w-4 cursor-pointer'
            src={assets.prev_icon}
            alt=""
          />

          {
            playStatus ? (
              <img
                onClick={pause}
                className='w-8 cursor-pointer'
                src={assets.pause_icon}
                alt=""
              />
            ) : (
              <img
                onClick={play}
                className='w-8 cursor-pointer'
                src={assets.play_icon}
                alt=""
              />
            )
          }

          <img
            onClick={next}
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt=""
          />

        </div>

        {/* SEEK BAR */}
        <div className='flex items-center w-full gap-2'>

          <p className='hidden w-10 text-xs text-right md:block text-white/40'>
            {format(time?.currentTime?.minute)}:
            {format(time?.currentTime?.second)}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className='flex-1 h-1 overflow-hidden rounded-full cursor-pointer bg-white/30'
          >

            <div
              ref={seekBar}
             className='h-1 transition-all duration-100 rounded-full bg-gradient-to-r from-pink-500 to-purple-500'
            />

          </div>

          <p className='hidden w-10 text-xs md:block text-white/40'>
            {format(time?.totalTime?.minute)}:
            {format(time?.totalTime?.second)}
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className='hidden lg:flex items-center gap-3 w-[20%] justify-end'>

        <img
          className='w-4 cursor-pointer'
          src={assets.volume_icon}
          alt=""
        />

        <div className='w-24 h-1 rounded-full bg-white/30'></div>

      </div>

    </div>

  ) : null
}

export default Player