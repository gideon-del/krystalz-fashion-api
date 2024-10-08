import { CategoryService } from '@app/category';
import { CreateCategoryDto } from '@app/category/dto/category.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('add')
  async createCampaign(@Body() campaignDto: CreateCategoryDto) {
    const campaign = await this.categoryService.create(campaignDto);

    return campaign;
  }
}
