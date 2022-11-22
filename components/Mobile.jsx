import * as React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Control from "./Control";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ListIcon from "@mui/icons-material/List";
import Playlist from "./Playlist";
import Songs from "./Songs";
import Spectrum from "../components/Spectrum";
import TrackSlider from "./TrackSlider";
import { StyledIconButton, TinyText } from "./Common";
import { getSongName } from "../utilities/utils";
import { memo } from "react";
import { useMusic } from "../providers/MusicProvider";

const Mobile = () => {
  const {
    currentRadio,
    currentSong,
    handleIsPlaying,
    handlePreviousNextSong,
    isLoading,
    repeatOne,
    setIsLoading,
    setPosition,
  } = useMusic();

  const [openDrawer, setOpenDrawer] = React.useState({
    playlist: false,
    songs: false,
  });

  const [duration, setDuration] = React.useState(0);

  const audioPlayer = React.useRef();

  const onTimeUpdate = (e) => {
    if (currentSong) {
      setPosition(e.target.currentTime);
    }
  };

  const onEnded = (e) => {
    if (currentSong && repeatOne) {
      setPosition(0);
      handleIsPlaying(audioPlayer?.current, true);
    } else {
      handlePreviousNextSong(1);
    }
  };

  const onCanPlayThrough = (e) => {
    if (currentSong) {
      setDuration(audioPlayer?.current?.duration);
    } else if (currentRadio) {
      setDuration(0);
    }

    setIsLoading(false);
  };

  const blah = React.useRef();

  React.useEffect(() => {
    const element = blah.current;

    element.addEventListener("touchstart", test);

    // 👇️ remove the event listener when component unmounts
    return () => {
      element.removeEventListener("touchstart", test);
    };
  }, []);

  function test(e) {
    const sound = new Audio(
      "https://dfalmen8fy7vv.cloudfront.net/Asian/Buon.mp3"
    );

    sound.play();
    sound.pause();
    sound.currentTime = 0;

    blah.current.removeEventListener("touchstart", test);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const disableControl = currentRadio !== undefined;

  const iconColor = disableControl ? "darkgray" : "#3F7089";

  return (
    <main className="player" ref={blah}>
      <audio
        id="audio"
        crossOrigin="anonymous"
        ref={audioPlayer}
        src={currentSong ? currentSong : currentRadio ? currentRadio.src : ""}
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onCanPlayThrough={onCanPlayThrough}
      ></audio>

      <Drawer anchor="left" open={openDrawer["playlist"]} variant="persistent">
        <IconButton
          onClick={toggleDrawer("playlist", false)}
          sx={{
            justifyContent: "flex-start",
            paddingTop: "16px",
            paddingLeft: "16px",
          }}
        >
          <CancelIcon sx={{ fontSize: "2.5rem" }} htmlColor="red" />
        </IconButton>
        <div style={{ padding: "10px" }}>
          <Playlist />
        </div>
      </Drawer>

      <Drawer anchor="right" open={openDrawer["songs"]} variant="persistent">
        <IconButton
          onClick={toggleDrawer("songs", false)}
          sx={{
            justifyContent: "flex-end",
            paddingTop: "16px",
            paddingRight: "16px",
          }}
        >
          <CancelIcon sx={{ fontSize: "2.5rem" }} htmlColor="red" />
        </IconButton>
        <div style={{ padding: "5px" }}>
          <Songs />
        </div>
      </Drawer>

      <div className="header">
        <StyledIconButton onClick={toggleDrawer("playlist", true)}>
          <ListIcon htmlColor="#3F7089" />
        </StyledIconButton>

        <StyledIconButton
          onClick={toggleDrawer("songs", true)}
          disabled={disableControl}
        >
          <LibraryMusicIcon htmlColor={iconColor} />
        </StyledIconButton>
      </div>

      <div style={{ margin: "10px", textAlign: "center" }}>
        <TinyText>(1) Pick a radio station or playlist on the left</TinyText>
        <TinyText>(2) Double tap on a song on the right</TinyText>
        <TinyText>(3) Enjoy the music!</TinyText>
      </div>

      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <Spectrum height={300} width={300} />
      </div>

      <div className="info">
        <h2>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="loader"></div>"Loading.."
            </div>
          ) : currentRadio ? (
            currentRadio.name
          ) : (
            getSongName(currentSong)
          )}
        </h2>
      </div>

      <TrackSlider audioPlayer={audioPlayer} duration={duration} />

      <Control audioPlayer={audioPlayer} />
    </main>
  );
};

export default memo(Mobile);
