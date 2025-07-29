import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('URL Shortener App')
        .setDescription('A RESTful API service that transforms and shortens your URLs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };

    const documentFactory = () => SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, documentFactory);

    await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
