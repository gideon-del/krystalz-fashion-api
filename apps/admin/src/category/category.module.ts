import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from '@app/category';
import { SharedModule } from '@app/shared';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [SharedModule],
})
export class CategoryModule {}
