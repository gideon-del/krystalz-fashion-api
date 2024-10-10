import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ImageUploader } from '@app/shared/services/image-upload.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
        productImages: {
          createMany: {
            data: uploadedImage.map((image) => ({ image_url: image })),
          },
        },
        size: {
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
        size: {
          select: {
            name: true,
            price: true,
            quantity: true,
          },
        },
        productImages: {
          select: {
            image_url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return product;
  }
  async getAllProduct() {
    const products = await this.prismaServie.product.findMany({
      include: {
        size: {
          select: {
            name: true,
            price: true,
            quantity: true,
          },
        },
        productImages: {
          select: {
            image_url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  }
  async getProduct(productId: string) {
    try {
      const product = await this.prismaServie.product.findFirstOrThrow({
        where: {
          id: productId,
        },
        include: {
          size: {
            select: {
              name: true,
              price: true,
              quantity: true,
            },
          },
          productImages: {
            select: {
              image_url: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('Product Not found');
      }
      throw error;
    }
  }
}
