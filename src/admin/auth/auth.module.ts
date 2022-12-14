import { JwtStrategy } from '@/admin/auth/strategy/jwt.strategy';
import { LocalStrategy } from '@/admin/auth/strategy/local.strategy';
import { UserEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../modules/user/user.controller';
import { UserModule } from '../modules/user/user.module';
import { AuthController, jwtConstants } from './auth.controller';
import { AuthService } from './auth.service';

const jwtModule = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '24h' },
});

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    jwtModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, jwtModule],
})
export class AuthModule {}
