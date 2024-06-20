import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Inlaze')
  .setDescription(`Se expondrá el funcionamiento interno de la API de "Redes sociales" utilizando Swagger`)
  .setVersion('1.0')
  .addTag('Inlaze')
  .addBearerAuth()
  .build()

const document = SwaggerModule.createDocument(app, options)

SwaggerModule.setup('api/docs', app, document)

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
