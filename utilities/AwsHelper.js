import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getPlaylists = async () => {
  const playlists = new Map();
  const Bucket = process.env.AWS_BUCKET;

  await s3
    .listObjectsV2({ Bucket }, (err, data) => {
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

  return playlists;
};