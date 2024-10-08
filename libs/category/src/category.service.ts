import { PrismaService } from '@app/shared/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(campaignDto: CreateCategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: campaignDto.name,
        },
      });
      return category;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('name already exists');
      }
      return null;
    }
  }
}
