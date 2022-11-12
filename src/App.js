import styled2 from "@emotion/styled";
import { styled, useTheme } from '@mui/material/styles';
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
  backgroundColor:"rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

function App() {
  return (
    <MainContainer>
<Widget>
   </Widget>
  
    </MainContainer>
  );
}

export default App;
