
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar el ValidationPipe globalmente para todas las solicitudes
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Convierte los datos de entrada en tipos adecuados (por ejemplo, 'string' a 'number')
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si se envían propiedades no definidas
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
