import { IsBooleanString, IsOptional } from "class-validator";

export class PublicFileDto {
  file: any;
  isThumbnail?: boolean;
}

export class FileUploadedResponseDto {
  url: string
}

export class UploadFileDto {
  @IsOptional()
  @IsBooleanString()
  isThumbnail: string;
}