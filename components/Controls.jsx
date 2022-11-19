import * as React from "react";
import Box from "@mui/material/Box";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import IconButton from "@mui/material/IconButton";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import Slider from "@mui/material/Slider";
import Spectrum from "../components/Spectrum";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { formatTime, getSongName } from "../utilities/utils";
import { memo } from "react";
import { styled } from "@mui/material/styles";
import { useMusic } from "../providers/MusicProvider";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const Controls = () => {
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

  const iconColor = disableControl ? "#eee" : "#000";

  return (
    <Box>
      <audio
        id="audio"
        crossOrigin="anonymous"
        ref={audioPlayer}
        src={currentSong ? currentSong : currentRadio ? currentRadio.src : ""}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      ></audio>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -1,
        }}
      >
        <Typography noWrap sx={{ minWidth: "220px" }}>
          <b>{currentRadio ? currentRadio.name : getSongName(currentSong)}</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton
            onClick={() => setShuffle(!shuffle)}
            disabled={disableControl}
          >
            {shuffle ? (
              <ShuffleOnIcon htmlColor={iconColor} />
            ) : (
              <ShuffleIcon htmlColor={iconColor} />
            )}
          </IconButton>

          <IconButton
            onClick={() => handlePreviousNextSong(-1)}
            disabled={disableControl}
          >
            <FastRewindIcon htmlColor={iconColor} />
          </IconButton>

          <IconButton
            aria-label={isPlaying ? "play" : "pause"}
            onClick={() => {
              if (currentSong || currentRadio) {
                handleIsPlaying(!isPlaying);
              } else {
                handlePreviousNextSong(1);
              }
            }}
          >
            {isPlaying ? (
              <PauseCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#000" />
            ) : (
              <PlayCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#000" />
            )}
          </IconButton>

          <IconButton
            onClick={() => handlePreviousNextSong(1)}
            disabled={disableControl}
          >
            <FastForwardIcon htmlColor={iconColor} />
          </IconButton>

          <IconButton
            onClick={() => setRepeatOne(!repeatOne)}
            disabled={disableControl}
          >
            {repeatOne ? (
              <RepeatOneOnIcon htmlColor={iconColor} />
            ) : (
              <RepeatOneIcon htmlColor={iconColor} />
            )}
          </IconButton>
        </Box>

        <Spectrum />

        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1, width: "230px" }}
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setVolume((oldVolume) => {
                const newVolume = Math.max(oldVolume - 0.1, 0);
                audioPlayer.current.volume = newVolume;
                return newVolume;
              });
            }}
          >
            <VolumeDownRounded />
          </IconButton>
          <Slider
            aria-label="Volume"
            value={volume}
            max={1}
            step={0.1}
            onChange={(_, value) => {
              audioPlayer.current.volume = value;
              setVolume(value);
            }}
            sx={{
              color: "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <IconButton
            onClick={() => {
              setVolume((oldVolume) => {
                const newVolume = Math.min(oldVolume + 0.1, 1);
                audioPlayer.current.volume = newVolume;
                return newVolume;
              });
            }}
          >
            <VolumeUpRounded />
          </IconButton>
        </Stack>
      </Box>

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
  );
};

export default memo(Controls);
