import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratgey } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'libs/common/src';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserService, JwtStratgey],
  imports: [UserModule, PassportModule, JwtModule.register({}), SharedModule],
})
export class AuthModule {}
