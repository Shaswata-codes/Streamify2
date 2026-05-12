import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {

  const audioRef = useRef(null);
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  const url = import.meta.env.VITE_BASE_URL;

  const [songData, setSongData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 }
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    const selected = songData.find(item => item._id === id);
    if (!selected) return;

    setTrack(selected);
    setTimeout(() => {
      audioRef.current.play();
      setPlayStatus(true);
    }, 100);
  };

  const previous = () => {
    const index = songData.findIndex(item => item._id === track._id);
    if (index > 0) {
      setTrack(songData[index - 1]);
    }
  };

  const next = () => {
    const index = songData.findIndex(item => item._id === track._id);
    if (index < songData.length - 1) {
      setTrack(songData[index + 1]);
    }
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.clientWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/songs/list`);
      if (res.data.success) {
        setSongData(res.data.songs);
        setTrack(res.data.songs[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/albums/list`);
      if (res.data.success) {
        setAlbumsData(res.data.albums);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.ontimeupdate = () => {
      if (!audioRef.current.duration) return;

      seekBar.current.style.width =
        (audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";

      setTime({
        currentTime: {
          minute: Math.floor(audioRef.current.currentTime / 60),
          second: Math.floor(audioRef.current.currentTime % 60)
        },
        totalTime: {
          minute: Math.floor(audioRef.current.duration / 60),
          second: Math.floor(audioRef.current.duration % 60)
        }
      });
    };
  }, [track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    play,
    pause,
    time,
    setTime,
    playWithId,
    previous,
    next,
    seekSong,
    songData,
    setSongData,
    albumsData,
    setAlbumsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;