import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
   
  ){}

    async email(name,userEmail,){
  const sendEmailResult = await this.mailerService.sendMail({
    to: userEmail,
    from: 'sergiocoba73@gmail.com',
    subject:"Registro exitoso",
    template:'emails',
    context:{
      name:name,
    }
  });
    return sendEmailResult;
}

}


