import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import mongoose from 'mongoose';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('movieId') movieId: string,
  ) {
    if (!movieId) throw new HttpException('MovieId is required', 406);
    try {
      const savedFile = await this.uploadsService.create(file, movieId);
      return { message: 'File uploaded successfully', upload: savedFile };
    } catch (error) {
      return { 'Failed to upload file': error };
    }
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUploadDto: UpdateUploadDto,
  ) {
    const {movieId} = updateUploadDto;
    if (movieId) {
      const isValid = mongoose.Types.ObjectId.isValid(movieId);
      if (!isValid) throw new HttpException('Invalid movie id', 400);
    }
    return this.uploadsService.update(id, file, movieId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(id);
  }
}
