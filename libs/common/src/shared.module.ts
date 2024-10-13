import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaService } from './prisma/prisma.service';
import { ImageUploader } from './services/image-upload.service';
import { PaymentService } from './payment/payment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [SharedService, PrismaService, ImageUploader, PaymentService],
  exports: [SharedService, PrismaService, ImageUploader, PaymentService],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class SharedModule {}
