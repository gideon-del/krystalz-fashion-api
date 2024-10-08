import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SharedModule } from '@app/shared';
import { PrismaService } from '@app/shared/prisma/prisma.service';

@Module({
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
  imports: [SharedModule],
})
export class CategoryModule {}
