import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { AppModule } from './app.module';
async function AppBootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/app/v1', { exclude: ['/'] });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('NextJs博客网站接口文档')
    .setContact('阿丘的个人技术博客网站', 'https://www.wingosite.site', '')
    .setVersion('1.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/app/swagger-doc', app, document);

  await app.listen(3006);
}

export default AppBootstrap;
