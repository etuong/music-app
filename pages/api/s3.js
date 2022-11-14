import AWS from "aws-sdk";

export default async function handler(req, res) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const get = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET,
    Fields: {
      key: req.query.file,
      "Content-Type": req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(get);
}
