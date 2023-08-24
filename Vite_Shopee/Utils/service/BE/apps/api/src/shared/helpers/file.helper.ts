import { uuid } from 'uuidv4';
import { isEnum, Min } from 'class-validator';
import * as multer from 'multer';
import * as path from 'path';
import { MSG_UNSUPPORTED_MIME_TYPE } from '@constants/messages.constant';

export enum FileMimeTypeSupportEnum {
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'text/csv',
  'application/zip',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

export enum ImageFileMimeTypeSupportEnum {
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
}

export const fileTypes = /jpeg|jpg|png|gif|zip|pdf|pptx|docx|xlsx|ppt|xls|doc|csv/;
export const imageFileTypes = /jpeg|jpg|png|gif/;

export const isValidFileMimeType = (fileName, fileMimeType) => {
  const extname = fileTypes.test(fileName.toLowerCase());
  if (isEnum(fileMimeType, FileMimeTypeSupportEnum) && extname) return true;
  return false;
}

export const isImageFileMimeType = (fileName, fileMimeType) => {
  const extname = imageFileTypes.test(fileName.toLowerCase());
  if (isEnum(fileMimeType, ImageFileMimeTypeSupportEnum) && extname) return true;
  return false;
}

export const isValidFileSize = (fileSize) => {
  const maxFileSize = parseInt(process.env.FILE_SIZE) ?? (1024*1024);
  if (fileSize <= maxFileSize) return true;
  return false;
}

const multerEngine = multer.diskStorage({
  // destination: process.env.LOCAL_UPLOAD_DEST,
  filename(req, file, cb) {
    cb(null, `${uuid()}_${file.originalname}`);
  },
});

const fileFilterCheck = function fileFilter(req, file, cb) {
  if (isValidFileMimeType(file.originalname, file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = MSG_UNSUPPORTED_MIME_TYPE;
    cb(null, false);
  }
};

export const multerOptions = {
  storage: multerEngine,
  fileFilter: fileFilterCheck,
  limits: { fileSize: parseInt(process.env.FILE_SIZE) ?? (1024*1024) },
};

export const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop();
}