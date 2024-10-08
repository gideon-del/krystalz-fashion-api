import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  saltRound: number;
  constructor(
    private userService: UserService,
    private jwtSerice: JwtService,
  ) {
    this.saltRound = 10;
  }
  genHash(password: string) {
    const hashedPassword = hashSync(password, this.saltRound);
    return hashedPassword;
  }
  async register(userDto: CreateUserDto) {
    const hashedPassowrd = this.genHash(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassowrd,
    });
    return user;
    // TODO: Add mailing service
  }
  async validateUser(email: string, password: string) {
    const userDetails = await this.userService.findUser(email);
    if (!userDetails) {
      throw new NotFoundException('Not Found');
    }
    const { password: hashedPassword, ...rest } = userDetails;
    const isCorrect = compareSync(password, hashedPassword);
    if (!isCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    return rest;
  }
  async login(user: any) {
    const payload = { id: user.id, role: user.role };
    return {
      access_token: this.jwtSerice.sign(payload, {
        expiresIn: '1h',
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refresh_token: this.jwtSerice.sign(payload, {
        expiresIn: '1h',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    };
  }
}
