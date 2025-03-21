import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module'; 
import { UserEntity } from './dataLayer/entities/user.entity';
import { JournalistModule } from './modules/jounrnalist.module'; 
import { JournalistEntity } from './dataLayer/entities/journalist.entity';
import { ChannelEntity } from './dataLayer/entities/channel.entity';
import { ChannelModule } from './modules/channel.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'gaston',
      password: 'gaston',
      database: 'MACNews',
      entities: [UserEntity,JournalistEntity,ChannelEntity],
      synchronize: false, 
    }),
    UserModule,
    JournalistModule,
    ChannelModule,
  ],
})
export class AppModule {}
