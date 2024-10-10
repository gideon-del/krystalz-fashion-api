import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModule as SharedProductModule } from '@app/product';

@Module({
  controllers: [ProductController],
  imports: [SharedProductModule],
})
export class ProductModule {}
