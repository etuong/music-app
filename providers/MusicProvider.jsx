import { createContext, useContext, useEffect, useState } from "react";

// import {ffprobe} from "ffprobe";
// import {ffprobeStatic} from "ffprobe-static";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");

  const fetchPlaylists = async () => {
    const res = await fetch(`/api/s3`);
    const data = await res.json();
    setPlaylists(data);
  };

  const handlePlaylistChange = async (category) => {
    setCurrentCategory(category);
    const songs = playlists[category];
    // const temp = [];
    // songs.forEach(async (song) => {
    //   const data = await ffprobe(
    //     `https://dfalmen8fy7vv.cloudfront.net/${playlist}/${song}.mp3`,
    //     { path: ffprobeStatic.path }
    //   );
    //   temp.push({
    //     title: song,
    //     size: data.format.size,
    //     duration: data.format.duration,
    //   });
    // });

    setCurrentPlaylist(songs);
  };

  const handleSongChange = (song) => {
    setCurrentSong(
      `https://dfalmen8fy7vv.cloudfront.net/${currentCategory}/${song}`
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
        currentPlaylist,
        handleSongChange,
        currentSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
