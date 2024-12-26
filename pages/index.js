import Controller from "../components/Controller";
import Mobile from "../components/Mobile";
import Playlist from "../components/Playlist";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { useLayoutEffect, useState } from "react";

const AppContainer = styled.div`
  display: flex;
  padding: 1.5%;
  height: 98vh;
  margin: 1vh;
  box-shadow: 20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff;
  border-radius: 20px;
  border: 2px solid rgb(223, 223, 223);
`;

const App = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);

  useLayoutEffect(() => {
    setIsMobileDevice(
      typeof window !== "undefined" &&
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );

    setIsSafariBrowser(
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Safari") > -1 &&
      navigator.userAgent.indexOf("Chrome") === -1
    );
  }, []);

  return isMobileDevice ? (
    <Mobile isSafariBrowser={isSafariBrowser} />
  ) : (
    <AppContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "15px" }}>
        <Controller isSafariBrowser={isSafariBrowser} />
        <Songs />
      </Stack>
    </AppContainer>
  );
};

export default App;

