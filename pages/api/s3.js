import AWS from "aws-sdk";

export default async function handler(req, res) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const data = await s3
    .listObjectsV2({ Bucket: "ethan-music-playlists" })
    .promise();

  const playlists = new Map();

  data.Contents.forEach((content) => {
    const [category, song] = content.Key.split("/");
    const songs = playlists.get(category);
    if (songs) {
      songs.push(song);
    } else {
      playlists.set(category, [song]);
    }
  });

  res.status(200).json(Object.fromEntries(playlists));
}
