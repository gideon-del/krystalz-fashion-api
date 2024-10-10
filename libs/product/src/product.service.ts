import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ImageUploader } from '@app/shared/services/image-upload.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private imageUploadService: ImageUploader,
    private prismaServie: PrismaService,
  ) {}
  async createProduct(
    productDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    const uploadedImage: string[] = [];
    for (const file of files) {
      const fileUrl = await this.imageUploadService.upload(file);
      uploadedImage.push(fileUrl);
    }
    const product = await this.prismaServie.product.create({
      data: {
        description: productDto.description,
        name: productDto.name,
        total_quantity: productDto.size.reduce(
          (acc, cur) => acc + +cur.quantity,
          0,
        ),
        categoryId: productDto.categoryId,
        ProductImages: {
          createMany: {
            data: uploadedImage.map((image) => ({ image_url: image })),
          },
        },
        Size: {
          createMany: {
            data: productDto.size.map((size) => ({
              name: size.name,
              price: +size.price,
              quantity: +size.quantity,
            })),
          },
        },
      },
      include: {
        Size: true,
        ProductImages: true,
        category: true,
      },
    });
    return product;
  }
}
