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
            user: "CO253676@smtp.mailpro.com",
            pass: "fQi*x64Rxlo#"
          }
        },
        defaults: {
          from: '"No Reply" <sergiocoba73@gmail.com',
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














