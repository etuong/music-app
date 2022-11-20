import AudioSpectrum from "react-audio-spectrum";
import { memo } from "react";

const Spectrum = ({ width, height }) => (
  <AudioSpectrum
    id="audio-canvas"
    height={height}
    width={width}
    audioId={"audio"}
    capColor={"red"}
    capHeight={2}
    meterWidth={2}
    meterCount={512}
    meterColor={[
      { stop: 0, color: "#3F7089" },
      { stop: 0.5, color: "#0CD7FD" },
      { stop: 1, color: "red" },
    ]}
    gap={4}
  />
);

export default memo(Spectrum);
