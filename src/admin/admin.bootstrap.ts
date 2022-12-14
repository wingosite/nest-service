import {
  HttpExceptionFilter,
  UnauthorizedExceptionFilter,
} from '@/filters/exception.filter';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';
async function AdminBootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/admin/v1', { exclude: ['/'] });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Admin Swagger UI')
    .setDescription('API docs for vue3 admin')
    .setVersion('1.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/admin/swagger-doc', app, document);

  await app.listen(3005);
}

export default AdminBootstrap;
