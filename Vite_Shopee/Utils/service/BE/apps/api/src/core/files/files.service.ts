import { Injectable } from '@nestjs/common';
import { PublicFileDto } from './dto/public-file.dto';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Storage } from '@squareboat/nest-storage';
import { ConfigService } from '@nestjs/config';
import { MSG_DELETE_SUCCESSFULLY_FILE } from '@constants/messages.constant';
import * as sharp from 'sharp';
import { getFileExtension } from '@helpers/file.helper';

@Injectable()
export class FilesService {

  private s3Service;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.s3Service = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string, isImageFile: boolean = false, isThumbnail: boolean = false) {
    if (!isImageFile) {
      return await this.uploadFileToS3(dataBuffer, filename);
    }

    // Resize images
    let sharpImg = sharp(dataBuffer);
    if (isThumbnail) {
      sharpImg = sharpImg.resize({ width: parseInt(this.configService.get('IMAGE_SIZE'), 10) })
    } else {
      sharpImg = sharpImg.webp({ quality: parseInt(this.configService.get('IMAGE_QUALITY'), 10) }).toFormat(getFileExtension(filename))
    }

    return await sharpImg.toBuffer()
      .then(async (data) => {
        return await this.uploadFileToS3(data, filename);
      });
  }

  async uploadFileToS3(dataBuffer: Buffer, filename: string) {
    let file = await Storage.disk('assets').put(`demo/${uuid()}-${filename}`, dataBuffer);
    if (this.configService.get('AWS_CLOUDFRONT_DOMAIN')) {
      let s3Domain: any = (new URL(file.Location));
      file.Location = file.Location.replace(s3Domain.hostname, this.configService.get('AWS_CLOUDFRONT_DOMAIN'));
    }
    return file;
  }

  async deleteUploadedFile(filePath: string) {
    const urlParse: any = (new URL(filePath));
    const s3Key = urlParse.pathname.replace('/', '');
    // const a = await Storage.disk('assets').delete(s3Key);
    await this.s3Service.deleteObject({
      Bucket: this.configService.get('AWS_S3_DOCS_BUCKET'),
      Key: s3Key
    }).promise();
    return { message: MSG_DELETE_SUCCESSFULLY_FILE };
  }
}
