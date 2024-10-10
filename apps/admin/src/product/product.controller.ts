import { ProductService } from '@app/product';
import { CreateProductDto } from '@app/product/dto/product.dto';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('create')
  @UseInterceptors(FilesInterceptor('image', 4))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.productService.createProduct(createProductDto, files);
  }
}
