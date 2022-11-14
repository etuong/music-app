const fs = require("fs");

const getPlaylistNames = () => {
  const playlistPath = process.env.PLAYLIST_LOCATION;

  const playlistNames = [];

  fs.readFileSync(
    playlistPath,
    {
      withFileTypes: true,
    },
    function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function (file) {
        if (file.isDirectory()) {
          playlistNames.push(file.name);
        }
      });
    }
  );

  return playlistNames;
};

const getAllSongNamesInPlaylist = () => {
  const playlistPath = process.env.PLAYLIST_LOCATION;

  const playlistNames = [];

  fs.readFileSync(
    playlistPath,
    {
      withFileTypes: true,
    },
    function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function (file) {
        if (file.isDirectory()) {
          playlistNames.push(file.name);
        }
      });
    }
  );
  
  return playlistNames;
};

module.exports = getPlaylistNames;
