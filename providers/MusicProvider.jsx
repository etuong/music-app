import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
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

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        playlists,
        handlePlaylistChange,
        songs,
        setCurrentSong,
        currentSong,
        currentCategory,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
