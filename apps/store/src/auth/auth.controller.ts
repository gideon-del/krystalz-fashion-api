import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guards/jwt.guard';
import { CreateUserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDto) {
    console.log('Received');
    const user = await this.authService.register(userDto);
    return user;
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
