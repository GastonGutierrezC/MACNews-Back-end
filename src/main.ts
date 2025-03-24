
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
    .setTitle('MacNews API')
    .setDescription('Documentación de la API de MacNews')
    .setVersion('1.0')
    .addTag('macnews') // Puedes agregar más etiquetas si lo deseas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' es la ruta donde estará disponible la documentación de Swagger

  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


