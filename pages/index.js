import Controller from "../components/Controller";
import Mobile from "../components/Mobile";
import Playlist from "../components/Playlist";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { useLayoutEffect, useEffect, useState } from "react";

const MainContainer = styled.div`
  display: flex;
  padding: 1.5%;
  height: 98vh;
  margin: 1vh;
  box-shadow: 20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff;
  border-radius: 20px;
  border: 2px solid rgb(223, 223, 223);
`;

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    setIsMobile(
      typeof window !== "undefined"
        ? navigator.userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
        : false
    );

    setIsSafari(
      typeof window !== "undefined"
        ? navigator.userAgent.indexOf("Safari") > -1 &&
        navigator.userAgent.indexOf("Chrome") === -1
        : false
    );
  }, []);

  return isMobile ? (
    <Mobile isSafari={isSafari} />
  ) : (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "15px" }}>
        <Controller isSafari={isSafari} />
        <Songs />
      </Stack>
    </MainContainer>
  );
}
