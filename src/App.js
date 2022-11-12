import styled2 from "@emotion/styled";
import { styled, useTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import Playlist from "./components/Playlist";
import Songs from "./components/Songs";
import Controls from "./components/Controls";

const MainContainer = styled2.div`
  display: flex;
  padding: 25px;
  height: 100vh;
`;

const Widget = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

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
