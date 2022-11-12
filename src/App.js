import styled from "@emotion/styled";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import Playlist from "./components/Playlist";
import Songs from "./components/Songs";
import Controls from "./components/Controls";

const MainContainer = styled.div`
  display: flex;
  padding: 25px;
  height: 100vh;
`;

function App() {
  return (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%" }}>
        <Controls />
        <Songs />
      </Stack>
    </MainContainer>
  );
}

export default App;
