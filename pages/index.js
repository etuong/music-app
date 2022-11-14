import Controls from "../components/Controls";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Playlist from "../components/Playlist";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  padding: 2%;
  height: 100vh;
`;

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Head>
        <title>Ethan's Music Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainContainer>
        <Playlist />
        <Stack sx={{ width: "100%", marginLeft: "10px" }}>
          <Controls />
          <Songs />
        </Stack>
      </MainContainer>
    </div>
  );
}
