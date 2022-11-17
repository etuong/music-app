import { createContext, useContext, useEffect, useState } from "react";
import { getRandomRangedNumber } from "../utilities/utils";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState("");
  const [shuffle, setShuffle] = useState(false);

  const fetchPlaylists = async () => {
    const res = await fetch(`/api/s3`);
    const data = await res.json();
    setPlaylists(data);
  };

  const handlePlaylistChange = async (category) => {
    setCurrentCategory(category);
    const songs = playlists[category];
    setSongs(songs);
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
        playlists,
        handlePlaylistChange,
        songs,
        handleSongChange,
        currentSong,
        currentCategory,
        shuffle,
        setShuffle,
        handlePreviousNextSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
