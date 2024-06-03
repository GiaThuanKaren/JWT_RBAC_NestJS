import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService

  ) {

  }
  async signupLocal(authDto: CreateAuthDto) {
    // await this.prismaService.user.create({
    //   data: {
    //     email: authDto.email,

        
    //   }
    // })

  }
  async signnLocal() {

  }
  async Logout() {

  }
  async refreshToken() {

  }
}
