import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {

  const cors = require('cors');

  const app = await NestFactory.create(AppModule);

  const corsOptions = { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] };
  app.use(cors(corsOptions));
  
  await app.listen(3000);
}

bootstrap();