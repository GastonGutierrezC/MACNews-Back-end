import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module'; // Asegúrate de importar el UserModule
import { UserEntity } from './dataLayer/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'gaston',
      password: 'gaston',
      database: 'MACNews',
      entities: [UserEntity],
      synchronize: false, 
    }),
    UserModule,
  ],
})
export class AppModule {}
