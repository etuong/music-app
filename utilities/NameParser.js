export function getSongName(song) {
  if (!song) return "";
  
  return song.slice(song.lastIndexOf("/") + 1, song.lastIndexOf("."));
}

export function getSongNameWithExt(song) {
  return song.slice(song.lastIndexOf("/") + 1);
}
