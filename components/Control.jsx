import React from "react";
import Box from "@mui/material/Box";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import { StyledIconButton } from "./Common";
import { useMusic } from "../providers/MusicProvider";

const Control = () => {
  const {
    currentRadio,
    currentSong,
    handleIsPlaying,
    handlePreviousNextSong,
    isPlaying,
    repeatOne,
    setRepeatOne,
    setShuffle,
    shuffle,
  } = useMusic();

  const disableControl = currentRadio !== undefined;

  const iconColor = disableControl ? "darkgray" : "#3F7089";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "auto",
      }}
    >
      <StyledIconButton
        onClick={() => setShuffle(!shuffle)}
        disabled={disableControl}
      >
        {shuffle ? (
          <ShuffleOnIcon htmlColor={iconColor} />
        ) : (
          <ShuffleIcon htmlColor={iconColor} />
        )}
      </StyledIconButton>

      <StyledIconButton
        onClick={() => handlePreviousNextSong(-1)}
        disabled={disableControl}
        sx={{ mr: 2, ml: 2 }}
      >
        <FastRewindIcon htmlColor={iconColor} />
      </StyledIconButton>

      <StyledIconButton
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
          <PauseCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#3F7089" />
        ) : (
          <PlayCircleIcon sx={{ fontSize: "3rem" }} htmlColor="#3F7089" />
        )}
      </StyledIconButton>

      <StyledIconButton
        onClick={() => handlePreviousNextSong(1)}
        disabled={disableControl}
        sx={{ mr: 2, ml: 2 }}
      >
        <FastForwardIcon htmlColor={iconColor} />
      </StyledIconButton>

      <StyledIconButton
        onClick={() => setRepeatOne(!repeatOne)}
        disabled={disableControl}
      >
        {repeatOne ? (
          <RepeatOneOnIcon htmlColor={iconColor} />
        ) : (
          <RepeatOneIcon htmlColor={iconColor} />
        )}
      </StyledIconButton>
    </Box>
  );
};

export default Control;
