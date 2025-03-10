import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('NestJS Document Management API')
    .setDescription('API documentation for the Document Management System')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = +app.get(ConfigService).get('PORT') || 8080;

  await app.listen(port, '0.0.0.0', async () => {
    console.log(`################################################
  🛡️  Server listening on port: http://0.0.0.0:${port} 🛡️
################################################`);
  });
}
bootstrap();
