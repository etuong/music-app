import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const Controls = () => {
  const [position, setPosition] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [repeatOne, setRepeatOne] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const [duration, setDuration] = React.useState(0);

  const audioPlayer = React.useRef();

  React.useEffect(() => {
    const subscribeTrackEvents = (track) => {
      track.addEventListener("loadedmetadata", function () {
        setDuration(track.duration);
        track.volume = volume;
      });

      track.addEventListener("timeupdate", function () {
        setPosition(track.currentTime);
      });

      track.addEventListener("ended", function () {
        // alert("END");
      });
    };

    subscribeTrackEvents(audioPlayer.current);
  }, []);

  const formatDuration = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    !prevValue ? audioPlayer.current.play() : audioPlayer.current.pause();
  };

  return (
    <Box>
      <audio
        ref={audioPlayer}
        src="https://dfalmen8fy7vv.cloudfront.net/Love+Songs/Come+Sail+Away.mp3"
        preload="metadata"
      ></audio>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -1,
        }}
      >
        <Typography noWrap>
          <b>My Heart Will Go On</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton onClick={() => setShuffle(!shuffle)}>
            {shuffle ? <ShuffleOnIcon htmlColor="#000" /> : <ShuffleIcon />}
          </IconButton>

          <IconButton>
            <FastRewindIcon />
          </IconButton>

          <IconButton
            aria-label={isPlaying ? "play" : "pause"}
            onClick={() => togglePlayPause()}
          >
            {isPlaying ? (
              <PauseCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#000" />
            ) : (
              <PlayCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#000" />
            )}
          </IconButton>

          <IconButton>
            <FastForwardIcon />
          </IconButton>

          <IconButton onClick={() => setRepeatOne(!repeatOne)}>
            {repeatOne ? (
              <RepeatOneOnIcon htmlColor="#000" />
            ) : (
              <RepeatOneIcon />
            )}
          </IconButton>
        </Box>

        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1, width: "230px" }}
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setVolume((oldVolume) => {
                const newVolume = oldVolume - 0.1;
                if (newVolume < 0) return oldVolume;
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
                const newVolume = oldVolume + 0.1;
                if (newVolume > 1) return oldVolume;
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
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => {
          setPosition(value);
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
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>{formatDuration(duration)}</TinyText>
      </Box>
    </Box>
  );
};

export default Controls;
