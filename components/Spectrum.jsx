import AudioSpectrum from "react-audio-spectrum";

const Spectrum = () => (
  <AudioSpectrum
    id="audio-canvas"
    height={50}
    width={100}
    audioId={"audio"}
    capColor={"red"}
    capHeight={2}
    meterWidth={2}
    meterCount={512}
    meterColor={[
      {stop: 0, color: '#3F7089'},
      {stop: 0.5, color: '#0CD7FD'},
      {stop: 1, color: 'red'}
    ]}
    gap={4}
  />
);

export default Spectrum;
