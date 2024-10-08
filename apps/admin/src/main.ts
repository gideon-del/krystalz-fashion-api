import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { ValidationPipe } from '@nestjs/common';
const PORT = process.env.PORT || 3001;
async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.setGlobalPrefix('admin');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  });
}
bootstrap();
