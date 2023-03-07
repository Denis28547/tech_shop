import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { File } from "formidable";

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_NORMAL_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

export function uploadFile(file: File) {
  const fileStream = fs.createReadStream(file.filepath);
  const fileName = uuidv4();

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
}

export function getFileStream(fileKey: string) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

export function deleteFile(fileKey: string) {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.deleteObject(deleteParams).promise();
}
