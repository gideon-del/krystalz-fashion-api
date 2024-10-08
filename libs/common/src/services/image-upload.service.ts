import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class ImageUploader {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async upload(filePath: string) {
    const imageUrl = await cloudinary.uploader.upload(filePath, {
      folder: 'krystalz',
    });
    return imageUrl.url;
  }
}
