import AudioSpectrum from "react-audio-spectrum";

const Spectrum = () => (
  <AudioSpectrum
    id="audio-canvas"
    key={`music_Spectrum`}
    height={200}
    width={520}
    audioId={"music"}
    capColor={"lightgreen"}
    capHeight={2}
    meterWidth={2}
    meterCount={512}
    meterColor={[
      { stop: 0, color: "red" },
      { stop: 0.5, color: "rgb(194, 248, 0)" },
      { stop: 1, color: "rgb(194, 248, 0)" },
    ]}
    gap={4}
  />
);

export default Spectrum;
