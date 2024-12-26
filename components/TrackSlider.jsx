import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { TinyText } from "./Common";
import { formatTime } from "../utilities/utils";
import { memo } from "react";
import { useMusic } from "../providers/MusicProvider";

const TrackSlider = () => {
  const { currentRadio, currentSong, duration, handleIsPlaying, setIsLoading, audioPlayer, setPosition, position } = useMusic();

  React.useEffect(() => {
    if (currentSong) {
      setTimeout(() => handleIsPlaying(true), 600);
    } else {
      handleIsPlaying(false);
    }
  }, [currentSong]);

  React.useEffect(() => {
    if (currentRadio) {
      setTimeout(() => {
        handleIsPlaying(true);
        setIsLoading(false);
      }, 600);
      setPosition(0);
    } else {
      handleIsPlaying(false);
    }
  }, [currentRadio]);

  const isDisabled = currentRadio !== undefined;

  return (
    <Box>
      <Slider
        aria-label="time-indicator"
        disabled={isDisabled}
        value={position}
        min={0}
        step={1}
        max={duration || 0}
        onChange={(_, value) => audioPlayer.currentTime = value}
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

export default memo(TrackSlider);

