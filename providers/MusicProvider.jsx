import { getRandomRangedNumber } from "../utilities/utils";
import { createContext, useContext, useEffect, useState } from "react";
import radioList from "../utilities/RadioPlaylist";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
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
  };

  const handleSongChange = (newSongIndex) => {
    const newSong = songs[newSongIndex];
    setCurrentSongIndex(newSongIndex);
    setIsLoading(true);
    setCurrentSong(
      `${process.env.NEXT_PUBLIC_CLOUDFRONT}/${currentCategory}/${newSong}`
    );
  };

  const handleIsPlaying = (audioPlayer, flag) => {
    if (flag) {
      setIsPlaying(true);
      audioPlayer.play();
    } else {
      setIsPlaying(false);
      audioPlayer.pause();
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

  useEffect(() => {
    (async () => await fetchPlaylists())();
  }, []);

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
        repeatOne,
        setIsLoading,
        setIsPlaying,
        setPosition,
        setRepeatOne,
        setShuffle,
        shuffle,
        songs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
