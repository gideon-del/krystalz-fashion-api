import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SharedModule } from '@app/shared';
@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [SharedModule],
})
export class CartModule {}
