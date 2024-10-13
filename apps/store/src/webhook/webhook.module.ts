import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { SharedModule } from '@app/shared';

@Module({
  controllers: [WebhookController],
  imports: [SharedModule],
})
export class WebhookModule {}
