import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Playlist from "./components/Playlist";
import Songs from "./components/Songs";
import Controls from "./components/Controls";

const MainContainer = styled.div`
  display: flex;
  padding: 2%;
  height: 100vh;
`;

function App() {
  return (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "10px" }}>
        <Controls />
        <Songs />
      </Stack>
    </MainContainer>
  );
}

export default App;
