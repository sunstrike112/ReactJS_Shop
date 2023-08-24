import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';;
import { multerOptions, isValidFileMimeType, isValidFileSize, isImageFileMimeType } from '@helpers/file.helper';
import { MSG_INVALID_FILE, MSG_UNSUPPORTED_MIME_TYPE, MSG_TOO_LARGE_FILE } from '@constants/messages.constant';
import { PublicFileDto, FileUploadedResponseDto, UploadFileDto } from './dto/public-file.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiExcludeEndpoint,
  ApiSecurity,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiBody({
    description: 'File is attached',
    type: PublicFileDto,
  })
  @ApiCreatedResponse({
    description: 'The file has been successfully uploaded.',
    type: FileUploadedResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFileDto) {
    if (!file) throw new BadRequestException(MSG_INVALID_FILE);
    const { originalname, mimetype } = file;
    if (!isValidFileMimeType(originalname, mimetype)) throw new BadRequestException(MSG_UNSUPPORTED_MIME_TYPE);
    if (!isValidFileSize(file.size)) throw new BadRequestException(MSG_TOO_LARGE_FILE);
    const isImageFile = isImageFileMimeType(originalname, mimetype);
    const isThumbnail = Boolean(body.isThumbnail);
    return this.filesService.uploadPublicFile(file.buffer, originalname, isImageFile, isThumbnail);
  }
}
