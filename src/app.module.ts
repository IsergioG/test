import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { AllExceptionsFilter } from './utils/HttpExceptionFiltes';
import { APP_FILTER } from '@nestjs/core';
import { MailModule } from './mail/mail.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD,
      database: process.env.NAME_BASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PostModule,
    AuthModule,
    MailModule,
  ],
  providers: [ 
    {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
})
export class AppModule {}
