import { getRandomRangedNumber } from "../utilities/utils";
import { createContext, useContext, useEffect, useState } from "react";
import radioList from "../utilities/RadioPlaylist";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [audioPlayer, setAudioPlayer] = useState();
  const [duration, setDuration] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentRadio, setCurrentRadio] = useState(undefined);
  const [currentSong, setCurrentSong] = useState(undefined);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState({});
  const [position, setPosition] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => await fetchPlaylists())();
  }, []);

  const fetchPlaylists = async () => {
    const res = await fetch(`/api/s3`);
    const data = await res.json();
    setPlaylists(data);
  };

  const handlePlaylistChange = async (category) => {
    setCurrentRadio(undefined);
    setCurrentCategory(category);
    setCurrentSongIndex(-1);
    const songs = playlists[category];
    setSongs(songs);
  };

  const handleRadioChange = async (station) => {
    setCurrentSong(undefined);
    setIsLoading(true);
    setCurrentRadio(station);
    createNewAudioPlayer(station);
  };

  const handleSongChange = (newSongIndex) => {
    const newSong = songs[newSongIndex];
    setCurrentSongIndex(newSongIndex);
    setIsLoading(true);
    setCurrentSong(
      `${process.env.NEXT_PUBLIC_CLOUDFRONT}/${currentCategory}/${newSong}`
    );
    const player = createNewAudioPlayer(
      `${process.env.NEXT_PUBLIC_CLOUDFRONT}/${currentCategory}/${newSong}`
    );
    setDuration(player?.duration);
    setIsLoading(false);
  };

  const handleIsPlaying = (flag) => {
    if (audioPlayer) {
      if (flag) {
        setIsPlaying(true);
        audioPlayer.play();
      } else {
        setIsPlaying(false);
        audioPlayer.pause();
      }
    }
  };

  const handlePreviousNextSong = (direction) => {
    let newSongIndex = -1;
    if (shuffle) {
      while (newSongIndex === -1 || newSongIndex === currentSongIndex) {
        newSongIndex = getRandomRangedNumber(songs.length);
      }
    } else {
      newSongIndex = currentSongIndex + direction;
      if (newSongIndex >= songs.length) {
        newSongIndex = 0;
      } else if (newSongIndex < 0) {
        newSongIndex = songs.length - 1;
      }
    }

    handleSongChange(newSongIndex);
  };

  const createNewAudioPlayer = (src) => {
    let ap = audioPlayer;
    if (!ap) {
      ap = new Audio();
      ap.id = "audio";
      ap.crossOrigin = "anonymous";
      ap.src = src;
      ap.preload = "auto";
      ap.ontimeupdate = onTimeUpdate;
      ap.onended = onEnded;
      // ap.oncanplaythrough = onCanPlayThrough;
      setAudioPlayer(ap);
    }

    return ap;

    // setAudioPlayer((prev) => {
    //   const next = { ...prev, src };
    //   return next;
    // });
  };

  const onTimeUpdate = (e) => {
    if (currentSong) {
      setPosition(e.target.currentTime);
    }
  };

  const onEnded = (e) => {
    if (currentSong && repeatOne) {
      setPosition(0);
      setIsPlaying(true);
      handleIsPlaying(audioPlayer, true);
    } else {
      handlePreviousNextSong(1);
    }
  };

  // const onCanPlayThrough = (e) => {
  //   if (currentSong) {
  //     setDuration(audioPlayer?.duration);
  //   } else if (currentRadio) {
  //     setDuration(0);
  //   }

  //   setIsLoading(false);
  // };

  return (
    <MusicContext.Provider
      value={{
        currentCategory,
        currentRadio,
        currentSong,
        handleIsPlaying,
        handlePlaylistChange,
        handlePreviousNextSong,
        handleRadioChange,
        handleSongChange,
        isLoading,
        isPlaying,
        playlists,
        position,
        radioList,
        duration,
        repeatOne,
        setIsLoading,
        setIsPlaying,
        setPosition,
        setRepeatOne,
        setShuffle,
        shuffle,
        songs,
        audioPlayer,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
