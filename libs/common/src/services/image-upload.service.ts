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
  async upload(file: Express.Multer.File) {
    const fileDataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const imageUrl = await cloudinary.uploader.upload(fileDataUri, {
      folder: 'krystalz',
    });
    console.log(`Image uploaded ${imageUrl.url}`);
    return imageUrl.url;
  }
}
