import * as React from "react";
import Box from "@mui/material/Box";
import Control from "./Control";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import TrackSlider from "./TrackSlider";
import Typography from "@mui/material/Typography";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { StyledIconButton } from "./Common";
import { getSongName } from "../utilities/utils";
import { memo } from "react";
import { useMusic } from "../providers/MusicProvider";
import dynamic from 'next/dynamic'

const Spectrum = dynamic(() => import('./Spectrum'), {
  ssr: false,
})

const Controller = ({ isSafari }) => {
  const { currentRadio, currentSong, isLoading, audioPlayer, setAudioPlayer } =
    useMusic();

  const [volume, setVolume] = React.useState(0.5);

  return (
    <Box>
      <audio
        id="audio"
        preload="auto"
        crossOrigin="anonymous"
        ref={(p) => setAudioPlayer(p)}
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
                <div className="loader"></div> Loading..
              </div>
            ) : currentRadio ? (
              currentRadio.name
            ) : (
              getSongName(currentSong)
            )}
          </b>
        </Typography>

        <Control />

        {!isSafari && <Spectrum width={100} height={50} />}

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
                audioPlayer.volume = newVolume;
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
              audioPlayer.volume = value;
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
                audioPlayer.volume = newVolume;
                return newVolume;
              });
            }}
          >
            <VolumeUpRounded />
          </StyledIconButton>
        </Stack>
      </Box>

      <TrackSlider />
    </Box>
  );
};

export default memo(Controller);
