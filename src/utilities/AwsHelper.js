// import AWS from "aws-sdk";
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
    Bucket: process.env.REACT_APP_BUCKET,
  });

s3.listObjectsV2({ Delimiter: "/" }, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data.Contents);
  }
});
