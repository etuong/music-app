// import AWS from "aws-sdk";
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIA3TKNSJGOEYLSTHBD",
  secretAccessKey: "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",
  region: "us-west-1",
});

s3.listObjectsV2(
  { Bucket: "ethan-music-playlists", Delimiter: "/", Prefix: "Random/" },
  (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data.Contents);
    }
  }
);
