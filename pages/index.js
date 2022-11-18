import Controls from "../components/Controls";
import Playlist from "../components/Playlist";
import Spectrum from "../components/Spectrum";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  padding: 1.5%;
  height: 100vh;
`;

export default function App() {
  return (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "15px" }}>
        <Controls />
        <Songs />
        <Spectrum />
      </Stack>
    </MainContainer>
  );
}
