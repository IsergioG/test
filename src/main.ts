import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   const options = new DocumentBuilder()
//   .setTitle('TuData')
//   .setDescription(`Se expondrá el funcionamiento interno de la API de "TuData" utilizando Swagger, esta documentación garantiza la transparencia, 
//   la eficiencia y el control en la interacción con la aplicación. A través de esta documentación, usted obtendrá una visión completa de los endpoints 
//   disponibles, los parámetros, los tipos de datos y las respuestas, lo que le permitirá entender "TuData" de manera efectiva.`)
//   .setVersion('1.0')
//   .addTag('tudata')
//   .addBearerAuth()
//   .build()

// const document = SwaggerModule.createDocument(app, options)

// SwaggerModule.setup('api/docs', app, document)

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
