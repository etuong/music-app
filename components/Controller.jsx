import * as React from "react";
import Box from "@mui/material/Box";
import Control from "./Control";
import Slider from "@mui/material/Slider";
import Spectrum from "./Spectrum";
import Stack from "@mui/material/Stack";
import TrackSlider from "./TrackSlider";
import Typography from "@mui/material/Typography";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { StyledIconButton } from "./Common";
import { getSongName } from "../utilities/utils";
import { memo } from "react";
import { useMusic } from "../providers/MusicProvider";

const Controller = () => {
  const {
    currentRadio,
    currentSong,
    handlePreviousNextSong,
    isLoading,
    repeatOne,
    setIsPlaying,
    setIsLoading,
    setPosition,
  } = useMusic();

  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);

  const audioPlayer = React.useRef();

  // Hack for Safari and Mobile
  const dummy = React.useRef();
  React.useEffect(() => {
    const element = dummy.current;

    element.addEventListener("touchstart", dummyTest);

    return () => {
      element.removeEventListener("touchstart", dummyTest);
    };
  }, []);

  const dummyTest = (e) => {
    const sound = new Audio(
      "https://dfalmen8fy7vv.cloudfront.net/Asian/Buon.mp3"
    );

    sound.play();
    sound.pause();
    sound.currentTime = 0;

    dummy.current.removeEventListener("touchstart", dummyTest);
  };

  const onTimeUpdate = (e) => {
    if (currentSong) {
      setPosition(e.target.currentTime);
    }
  };

  const onEnded = (e) => {
    if (currentSong && repeatOne) {
      setPosition(0);
      setIsPlaying(true);
      audioPlayer.current.load();
      audioPlayer.current.play();
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

  return (
    <Box ref={dummy}>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -1,
        }}
      >
        <Typography
          noWrap
          variant="h6"
          sx={{ minWidth: "250px", color: "#A4B7BE" }}
        >
          <b>
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="loader"></div>"Loading.."
              </div>
            ) : currentRadio ? (
              currentRadio.name
            ) : (
              getSongName(currentSong)
            )}
          </b>
        </Typography>

        <Control audioPlayer={audioPlayer} />

        <Spectrum width={100} height={50} />

        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1, width: "230px" }}
          alignItems="center"
        >
          <StyledIconButton
            onClick={() => {
              setVolume((oldVolume) => {
                const newVolume = Math.max(oldVolume - 0.1, 0);
                audioPlayer.current.volume = newVolume;
                return newVolume;
              });
            }}
          >
            <VolumeDownRounded />
          </StyledIconButton>

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

          <StyledIconButton
            onClick={() => {
              setVolume((oldVolume) => {
                const newVolume = Math.min(oldVolume + 0.1, 1);
                audioPlayer.current.volume = newVolume;
                return newVolume;
              });
            }}
          >
            <VolumeUpRounded />
          </StyledIconButton>
        </Stack>
      </Box>

      <TrackSlider audioPlayer={audioPlayer} duration={duration} />
    </Box>
  );
};

export default memo(Controller);
