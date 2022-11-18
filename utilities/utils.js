export function getSongName(song) {
  if (!song) return "";

  return song.slice(song.lastIndexOf("/") + 1, song.lastIndexOf("."));
}

export function getSongNameWithExt(song) {
  if (!song) return "";

  return song.slice(song.lastIndexOf("/") + 1);
}

export function getRandomRangedNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

export function formatTime(secs) {
  if (!secs || secs <= 0 || isNaN(secs)) {
    return "--:--";
  }

  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
}
