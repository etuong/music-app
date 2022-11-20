import Controller from "../components/Controller";
import Mobile from "../components/Mobile";
import Playlist from "../components/Playlist";
import Songs from "../components/Songs";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  padding: 1.5%;
  height: 98vh;
  margin: 1vh;
  box-shadow: 20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff;
  border-radius: 20px;
  border: 2px solid rgb(223, 223, 223);
`;

export async function getServerSideProps(context) {
  const userAgent = context.req
    ? context.req.headers["user-agent"]
    : navigator.userAgent;

  const isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: { isMobile },
  };
}

export default function App({ isMobile }) {
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <MainContainer>
      <Playlist />
      <Stack sx={{ width: "100%", marginLeft: "15px" }}>
        <Controller />
        <Songs />
      </Stack>
    </MainContainer>
  );
}
