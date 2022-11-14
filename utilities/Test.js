// import AWS from "aws-sdk";
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIA3TKNSJGOEYLSTHBD",
  secretAccessKey: "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",
  region: "us-west-1",
});

const playlists = new Map();

const getSongs = async () => {
  await s3
    .listObjectsV2({ Bucket: "ethan-music-playlists" }, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        data.Contents.forEach((content) => {
          const [category, song] = content.Key.split("/");
          const songs = playlists.get(category);
          if (songs) {
            songs.push(song);
          } else {
            playlists.set(category, [song]);
          }
        });
      }
    })
    .promise();

  console.log(playlists);
};

getSongs();
