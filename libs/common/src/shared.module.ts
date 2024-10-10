import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaService } from './prisma/prisma.service';
import { ImageUploader } from './services/image-upload.service';

@Module({
  providers: [SharedService, PrismaService, ImageUploader],
  exports: [SharedService, PrismaService, ImageUploader],
})
export class SharedModule {}
