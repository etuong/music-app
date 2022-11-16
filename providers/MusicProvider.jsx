import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState("");

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
    setCurrentSong(
      `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT}/${currentCategory}/${newSong}`
    );
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
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
