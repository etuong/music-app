import Controls from "../components/Controls";
import Playlist from "../components/Playlist";
import Mobile from "../components/Mobile";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  padding: 1.5%;
  height: 100vh;
  background: #ebebeb;
`;

export default function App({ isMobile }) {
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "15px" }}>
        <Controls />
        <Songs />
      </Stack>
    </MainContainer>
  );
}

App.getInitialProps = ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;

  let isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return { isMobile };
};
