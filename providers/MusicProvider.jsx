import { createContext, useContext, useEffect, useState } from "react";
const probe = require("node-ffprobe");
const ffprobeInstaller = require("@ffprobe-installer/ffprobe");

probe.FFPROBE_PATH = ffprobeInstaller.path;

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  const fetchPlaylists = async () => {
    const res = await fetch(`/api/s3`);
    const data = await res.json();
    setPlaylists(data);
  };

  const handlePlaylistChange = async (playlist) => {
    const songs = playlists[playlist];
    const temp = [];
    songs.forEach(async (song) => {
      const data = await probe(
        `https://dfalmen8fy7vv.cloudfront.net/${playlist}/${song}.mp3`
      );
      temp.push({
        title: song,
        size: data.format.size,
        duration: data.format.duration,
      });
    });

    setCurrentPlaylist(...temp);
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
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
