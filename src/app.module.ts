import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module'; 
import { UserEntity } from './DomainLayer/Entities/user.entity';
import { ApplicationFormEntity } from './DomainLayer/Entities/applicationForm.entity';
import { ChannelEntity } from './DomainLayer/Entities/channel.entity';
import { ChannelModule } from './modules/channel.module';
import { NewsEntity } from './DomainLayer/Entities/news.entity';
import { NewsModule } from './modules/news.module';
import { PasswordEntity } from './DomainLayer/Entities/pasword.entity';
import { RolesEntity } from './DomainLayer/Entities/roles.entity';
import { ApplicationFormModule } from './modules/applicationForm.module';

//Journalist

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'gaston',
      password: 'gaston',
      database: 'MACNews',
      entities: [UserEntity,ApplicationFormEntity,ChannelEntity,NewsEntity,PasswordEntity,RolesEntity],
      synchronize: false, 
    }),
    UserModule,
    ApplicationFormModule,
    ChannelModule,
    NewsModule,
  ],
})
export class AppModule {}
