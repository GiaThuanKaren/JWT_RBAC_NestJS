import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Bcrypt from "bcrypt"
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService

  ) {

  }


  hashData(data: string) {
    return Bcrypt.hash(data, 10)
  }
  async getTokens(userId: number, email: string): Promise<Tokens> {

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        id: userId,
        email,
      }, {
        expiresIn: 60 * 15,
        secret: "at-secret"
      }
      ),
      this.jwtService.signAsync({
        id: userId,
        email,
      }, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: "rt-secret"
      }
      )
    ])

    return {
      access_token: at,
      refresh_token: rt
    }

  }

  async updateHash(userId: number, rt: string) {
    const hash = await this.hashData(rt)
    await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        hashedat: hash
      }
    })
  }

  async signupLocal(authDto: CreateAuthDto) {
    // : Promise<Tokens> 

    const hash = await this.hashData(authDto.password)

    let newwUser = await this.prismaService.user.create({
      data: {
        email: authDto.email,
        hash: hash

      }
    })

    const tokens = await this.getTokens(
      newwUser.id,
      newwUser.email
    )
    await this.updateHash(
      newwUser.id,
      tokens.refresh_token
    )
    return tokens
  }

  async signnLocal(authDto: CreateAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email
      }
    })
    if (!user) {
      throw new ForbiddenException("Access Denined")
    }
    const passwordMatches = await Bcrypt.compare(authDto.password, user.hash)

    const tokens = await this.getTokens(
      user.id,
      user.email
    )
    await this.updateHash(
      user.id,
      tokens.refresh_token
    )
    return tokens
  }

  async Logout(userid: number) {
    return await this.prismaService.user.updateMany({
      where: {
        id: userid,
        hashedat: {
          not: null
        }
      },
      data: {
        hashedat: null
      }
    })
  }
  async refreshToken(
    userId: number, rt: string
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new ForbiddenException("Access Denied")
    }
    const rtMatches = await Bcrypt.compare(rt, user.hashedat)
    if (!rtMatches)
      throw new ForbiddenException("Access Denied")

    const tokens = await this.getTokens(
      user.id,
      user.email
    )
    await this.updateHash(
      user.id,
      tokens.refresh_token
    )
    return tokens


  }
}
