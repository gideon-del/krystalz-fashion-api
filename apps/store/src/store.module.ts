import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [AuthModule, ProductModule, CartModule, OrderModule, WebhookModule],
  controllers: [],
  providers: [],
})
export class StoreModule {}
