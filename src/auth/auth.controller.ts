import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
@ApiTags("Authentication ")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("local/signup")
  async signupLocal(
    @Body() authDto: CreateAuthDto

  )
  // : Promise<Tokens> 
  {
    let result = await this.authService.signupLocal(authDto)
    return result
  }

  @Post("local/signin")
  async signnLocal(
    @Body() authDto: CreateAuthDto
  ) {
    return await this.authService.signnLocal(authDto)

  }


  @UseGuards(AuthGuard('jwt'))
  @Post("logout")
  async Logout(
    @Req() req: Request
  ) {
    let user = req.user
    console.log(user)
    return await this.authService.Logout(user["id"])
    // return iduser

  }


  @UseGuards(AuthGuard('jwt-refresh'))
  @Post("refresh")
  async refreshToken() {
    await this.authService.refreshToken()

  }



}
