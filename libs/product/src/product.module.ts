import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { SharedModule } from '@app/shared';
import { ImageUploader } from '@app/shared/services/image-upload.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';

@Module({
  providers: [ProductService, ImageUploader, PrismaService],
  exports: [ProductService],
  imports: [SharedModule],
})
export class ProductModule {}
