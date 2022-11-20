import ListIcon from "@mui/icons-material/List";
import { useMusic } from "../providers/MusicProvider";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import * as React from "react";
import Box from "@mui/material/Box";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import Slider from "@mui/material/Slider";
import Spectrum from "../components/Spectrum";
import Stack from "@mui/material/Stack";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { formatTime, getSongName } from "../utilities/utils";
import { memo } from "react";
import { TinyText, StyledIconButton } from "./Common";

const Mobile = () => {
  const {
    currentRadio,
    currentSong,
    handlePreviousNextSong,
    setShuffle,
    shuffle,
  } = useMusic();

  const [position, setPosition] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [repeatOne, setRepeatOne] = React.useState(false);
  const [duration, setDuration] = React.useState(0);

  const audioPlayer = React.useRef();

  React.useEffect(() => {
    if (currentSong) {
      setTimeout(() => {
        setDuration(audioPlayer.current.duration);
        handleIsPlaying(true);
      }, 500);
    } else {
      handleIsPlaying(false);
    }
  }, [currentSong]);

  React.useEffect(() => {
    if (currentRadio) {
      setTimeout(() => {
        setDuration(0);
        handleIsPlaying(true);
      }, 500);
      setPosition(0);
    } else {
      handleIsPlaying(false);
    }
  }, [currentRadio]);

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

  const handleIsPlaying = (flag) => {
    if (flag) {
      setIsPlaying(true);
      audioPlayer.current.play();
    } else {
      setIsPlaying(false);
      audioPlayer.current.pause();
    }
  };

  const disableControl = currentRadio !== undefined;

  const iconColor = disableControl ? "#eee" : "#3F7089";

  return (
    <main className="player">
      <audio
        id="audio"
        crossOrigin="anonymous"
        ref={audioPlayer}
        src={currentSong ? currentSong : currentRadio ? currentRadio.src : ""}
        // src="https://dfalmen8fy7vv.cloudfront.net/Modern Pop/Thirteen Thirtyfive.mp3"
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      ></audio>

      <div className="header">
        <StyledIconButton
          onClick={() => handlePreviousNextSong(-1)}
          disabled={disableControl}
        >
          <ListIcon htmlColor={iconColor} />
        </StyledIconButton>

        <StyledIconButton
          onClick={() => handlePreviousNextSong(-1)}
          disabled={disableControl}
        >
          <LibraryMusicIcon htmlColor={iconColor} />
        </StyledIconButton>
      </div>
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <Spectrum />
      </div>

      <div className="info">
        <h2>Elanor Rigby</h2>
      </div>

      <Box sx={{ mt: 1, mb: 1 }}>
        <Slider
          aria-label="time-indicator"
          disabled={disableControl}
          value={position}
          min={0}
          step={1}
          max={duration || 0}
          onChange={(_, value) => {
            audioPlayer.current.currentTime = value;
          }}
          sx={{
            height: 6,
            color: "#3F7089",
            "& .MuiSlider-thumb": {
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatTime(position)}</TinyText>
          <TinyText>{formatTime(duration)}</TinyText>
        </Box>
      </Box>

      asdf
    </main>
  );
};

export default memo(Mobile);
