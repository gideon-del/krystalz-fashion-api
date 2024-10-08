import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: userDto.email,
        role: 'USER',
        first_name: userDto.firstName,
        last_name: userDto.lastName,
        password: userDto.password,
      },
    });
    return user;
  }
  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
  async findUserById(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    return user;
  }
}
