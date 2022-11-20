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
    handlePreviousNextSong,
    repeatOne,
    setPosition,
  } = useMusic();

  const [openDrawer, setOpenDrawer] = React.useState({
    playlist: false,
    songs: false,
  });

  const audioPlayer = React.useRef();

  const onTimeUpdate = (e) => {
    if (currentSong) {
      setPosition(e.target.currentTime);
    }
  };

  const onEnded = (e) => {
    if (currentSong && repeatOne) {
      setPosition(0);
      handleIsPlaying(true);
    } else {
      handlePreviousNextSong(1);
    }
  };

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
    <main className="player">
      <audio
        id="audio"
        crossOrigin="anonymous"
        ref={audioPlayer}
        src={currentSong ? currentSong : currentRadio ? currentRadio.src : ""}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
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
        <h2>{currentRadio ? currentRadio.name : getSongName(currentSong)}</h2>
      </div>

      <TrackSlider audioPlayer={audioPlayer} />

      <Control audioPlayer={audioPlayer} />
    </main>
  );
};

export default memo(Mobile);
