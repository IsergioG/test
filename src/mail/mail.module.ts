import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [

    MailerModule.forRoot({
        transport: {
          host: 'smtp.mailpro.com',
          port: 587,
          auth: {
            user: process.env.API_KEY,
            pass: process.env.SECRET_ACCESS_KEY
          }
        },
        defaults: {
          from: process.env.SENDER_EMAIL
        },
        template: {
          dir: join(__dirname, '/template'),
          adapter: new HandlebarsAdapter(), // o cualquier otro adaptador que desees usar
          options: {
            strict: true,
          },
        },
      }),
  ],
  providers: [MailService],
})
export class MailModule {}














