import { getRandomRangedNumber } from "../utilities/utils";
import { createContext, useContext, useEffect, useState } from "react";
import radioList from "../utilities/RadioPlaylist";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(undefined);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState("");
  const [shuffle, setShuffle] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(undefined);

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
    setCurrentRadio(station);
  };

  const handleSongChange = (newSongIndex) => {
    const newSong = songs[newSongIndex];
    setCurrentSongIndex(newSongIndex);
    setCurrentSong(
      `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT}/${currentCategory}/${newSong}`
    );
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
    fetchPlaylists();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentCategory,
        currentRadio,
        currentSong,
        handlePlaylistChange,
        handlePreviousNextSong,
        handleRadioChange,
        handleSongChange,
        playlists,
        radioList,
        setShuffle,
        shuffle,
        songs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
