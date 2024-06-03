import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Authentication ")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("local/signup")
  async signupLocal(
    @Body() authDto: CreateAuthDto

  ) {
    await this.authService.signupLocal(authDto)
  }

  @Post("local/signin")
  async signnLocal() {
    await this.authService.signnLocal()

  }


  @Post("logout")
  async Logout() {
    await this.authService.Logout()

  }



  @Post("refresh")
  async refreshToken() {
    await this.authService.refreshToken()

  }



}
