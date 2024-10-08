import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [AuthModule],
  controllers: [StoreController, ProductController],
  providers: [StoreService],
})
export class StoreModule {}
