
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE',
  });
  

    const config = new DocumentBuilder()
    .setTitle('MacNews API')
    .setDescription('Documentación de la API de MacNews')
    .setVersion('1.0')
    .addTag('macnews') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();




