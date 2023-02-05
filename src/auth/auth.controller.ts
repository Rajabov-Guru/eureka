import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCookies } from '../decorators/cookies.decorator';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }


  @ApiOperation({summary:"Регистрация"})
  @Post('/registration')
  async registration(@Body() dto:CreateUserDto, @Res({passthrough: true}) response: Response){
    const userData = await this.authService.registration(dto);
    response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return userData;
  }


  @ApiOperation({summary:"Авторизация"})
  @Post('/login')
  async login(@Body() dto:CreateUserDto, @Res({passthrough: true}) response: Response){
    const userData = await this.authService.login(dto);
    response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return userData;
  }

  @ApiOperation({summary:"Логаут"})
  @Post('/logout')
  async logout(@GetCookies('refreshToken') refreshToken:string,
               @Res({passthrough: true}) response: Response){
    response.clearCookie('refreshToken');
    return this.authService.logout(refreshToken);
  }

  @ApiOperation({summary:"Refresh"})
  @Get('/refresh')
  async refresh(@GetCookies('refreshToken') refreshToken:string,
               @Res({passthrough: true}) response: Response){
    const userData = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return userData;
  }
}
