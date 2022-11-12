import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LinearProgress from "@mui/material/LinearProgress";
const Controls = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ minWidth: 250 }}>
      <IconButton>
        <ShuffleIcon />
      </IconButton>

      <IconButton>
        <FastRewindIcon />
      </IconButton>

      <IconButton>
        <PlayCircleIcon sx={{ fontSize: 50 }} />
      </IconButton>

      <IconButton>
        <FastForwardIcon />
      </IconButton>

      <IconButton>
        <RepeatIcon />
      </IconButton>

      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default Controls;
