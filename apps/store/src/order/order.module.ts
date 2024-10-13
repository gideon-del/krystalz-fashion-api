import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { SharedModule } from '@app/shared';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderService],
  imports: [SharedModule],
  controllers: [OrderController],
})
export class OrderModule {}
