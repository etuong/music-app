import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getSongs = () => {
  s3.listObjectsV2(
    { Bucket: process.env.AWS_BUCKET, Delimiter: "/", Prefix: "Random/" },
    (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data.Contents);
      }
    }
  );
};
