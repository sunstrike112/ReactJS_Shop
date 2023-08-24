import { registerAs } from '@nestjs/config';
export default registerAs('filesystem', () => ({
  default: 'assets',
  disks: {
    assets: {
      driver: 's3',
      bucket: process.env.AWS_S3_DOCS_BUCKET,
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    }
  }})
);