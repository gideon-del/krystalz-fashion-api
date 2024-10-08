import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
const PORT = process.env.PORT || 3001;
async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  await app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
  });
}
bootstrap();
