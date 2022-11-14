import { createContext, useContext, useEffect, useState } from "react";
import { getPlaylists } from "../utilities/AwsHelper";

const MusicContext = createContext({});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const fetchedPlaylists = await getPlaylists();
    setPlaylists(fetchedPlaylists);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        playlists,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
