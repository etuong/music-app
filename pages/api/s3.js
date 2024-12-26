import AWS from "aws-sdk";

/**
 * AWS Lambda function to list all song files in S3, grouped by category.
 */
export default async function handler(_req, res) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  const listObjectsV2Params = {
    Bucket: process.env.BUCKET,
  };

  const data = await s3.listObjectsV2(listObjectsV2Params).promise();

  const playlists = new Map();

  data.Contents.forEach((file) => {
    const [category, song] = file.Key.split("/");
    const songs = playlists.get(category);
    if (songs) {
      songs.push(song);
    } else {
      playlists.set(category, [song]);
    }
  });

  res.status(200).json(Object.fromEntries(playlists));
}

