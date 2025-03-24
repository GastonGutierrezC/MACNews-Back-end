import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module'; 
import { UserEntity } from './DomainLayer/Entities/user.entity';
import { JournalistModule } from './modules/jounrnalist.module'; 
import { JournalistEntity } from './DomainLayer/Entities/journalist.entity';
import { ChannelEntity } from './DomainLayer/Entities/channel.entity';
import { ChannelModule } from './modules/channel.module';
import { NewsEntity } from './DomainLayer/Entities/news.entity';
import { NewsModule } from './modules/news.module';
import { PasswordEntity } from './DomainLayer/Entities/pasword.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'gaston',
      password: 'gaston',
      database: 'MACNews',
      entities: [UserEntity,JournalistEntity,ChannelEntity,NewsEntity,PasswordEntity],
      synchronize: false, 
    }),
    UserModule,
    JournalistModule,
    ChannelModule,
    NewsModule,
  ],
})
export class AppModule {}
