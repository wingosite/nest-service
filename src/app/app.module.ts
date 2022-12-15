import {
  AppArticleModule,
  AppWebsiteModule,
  SystemModule,
  TagModule,
} from '@/app/modules';
import { ArticleEntity, CategoryEntity, SystemEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_DEV === 'production',
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [ArticleEntity, SystemEntity, CategoryEntity], //实体
        host: configService.get('NEST_APP_MYSQL_HOST', 'localhost'),
        port: configService.get('NEST_APP_MYSQL_PORT', 3306),
        username: configService.get('NEST_APP_MYSQL_USERNAME', 'root'),
        password: configService.get('NEST_APP_MYSQL_PASSWORD', 'password'),
        database: configService.get('NEST_APP_MYSQL_DATABASE', 'sass'),
        timezone: '+08:00', //服务器上配置的时区,
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    AppArticleModule,
    TagModule,
    SystemModule,
    AppWebsiteModule,
  ],
})
export class AppModule {}
