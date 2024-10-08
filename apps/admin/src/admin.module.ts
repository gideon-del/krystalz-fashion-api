import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { CategoryModule } from './category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
