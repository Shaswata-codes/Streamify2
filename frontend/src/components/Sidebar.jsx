import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    

    const isHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

    return (
        <>
            <div className='hidden lg:flex w-[25%] h-full p-2 text-white flex-col gap-2'>

                <div className='bg-[#121212] hover:bg-[#1a1a1a] rounded-lg flex flex-col justify-around p-4 transition-colors duration-200'>
                    <div onClick={() => navigate('/dashboard')} className='flex items-center gap-3 cursor-pointer group'>
                        <img className='w-6 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.home_icon} alt="" />
                        <p className='font-bold text-white/80 group-hover:text-white transition-colors'>Home</p>
                    </div>
                </div>

                <div className='bg-[#121212] hover:bg-[#1a1a1a] rounded-lg flex flex-col justify-around p-4 transition-colors duration-200'>
    
    <div
        onClick={() => navigate('/search')}
        className='flex items-center gap-3 cursor-pointer group'
    >
        <img
            className='w-6 opacity-70 group-hover:opacity-100 transition-opacity'
            src={assets.search_icon}
            alt=""
        />

        <p className='font-bold text-white/80 group-hover:text-white transition-colors'>
            Search
        </p>
    </div>

</div>

                <div className='bg-[#121212] h-[85%] rounded-lg overflow-hidden'>
                <div
    onClick={() => navigate('/library')}
    className='flex items-center justify-between p-4 border-b border-white/5 cursor-pointer'
>
                        <div className='flex items-center gap-3'>
                            <img className='w-8' src={assets.stack_icon} alt="" />
                            <p className='font-semibold text-white/90'>Your Library</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <img className='w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' src={assets.arrow_icon} alt="" />
                            <img className='w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' src={assets.plus_icon} alt="" />
                        </div>
                    </div>

                    <div className='p-4 bg-[#1e1e1e] hover:bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start gap-1 pl-4 transition-colors duration-200'>
                        <h1 className='text-white/90'>Create a playlist</h1>
                        <p className='font-light text-white/50 text-sm'>It's easy, we'll help you through</p>
                        <button className='px-4 py-1.5 bg-white hover:bg-white/90 text-[14px] text-black rounded-full mt-4 font-bold transition-colors'>
                            Create Play
                        </button>
                    </div>

                    <div className='p-4 bg-[#1e1e1e] hover:bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start gap-1 pl-4 mt-2 transition-colors duration-200'>
                        <h1 className='text-white/90'>Podcasts to follow</h1>
                        <p className='font-light text-white/50 text-sm'>We'll keep you updated on new episodes</p>
                        <button className='px-4 py-1.5 bg-white hover:bg-white/90 text-[14px] text-black rounded-full mt-4 font-bold transition-colors'>
                            Browse Podcasts
                        </button>
                    </div>
                </div>
            </div>

            <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3 text-white'>
                <div className='flex items-center justify-between'>
              
<div className='w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden'>
    <img src={assets.logocopy} className='w-6 h-6 object-contain' alt="" />
</div>


<span className='font-bold text-white text-base tracking-wide'>🎵 Streamify</span>

                    <div className='flex items-center gap-1'>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className={`flex flex-col items-center px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 gap-1 ${
                                isHome ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                            }`}
                        >
                            <img className='w-4 opacity-80' src={assets.home_icon} alt="" />
                            Home
                        </button>

                        <button
  onClick={() => navigate('/search')}
  className='flex flex-col items-center px-4 py-1.5 rounded-full text-xs font-semibold text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-200 gap-1'
>

                            <img className='w-4 opacity-80' src={assets.search_icon} alt="" />
                            Search
                        </button>

                        <button
  onClick={() => navigate('/library')}
  className='flex flex-col items-center px-4 py-1.5 rounded-full text-xs font-semibold text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-200 gap-1'
>
                            <img className='w-4 opacity-80' src={assets.stack_icon} alt="" />
                            Library
                        </button>
                    </div>
                </div>
            </div>

           
            <div className='lg:hidden h-[60px]' />
        </>
    )
}

export default SideBar