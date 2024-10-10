import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModule as SharedProductModue } from '@app/product';

@Module({
  controllers: [ProductController],
  imports: [SharedProductModue],
})
export class ProductModule {}
