import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }

  @ApiOperation({summary:"Регистрация"})
  @Post('/registration')
  registration(@Body() dto:CreateUserDto){
    return this.authService.registration(dto);
  }


  @ApiOperation({summary:"Регистрация"})
  @Post('/login')
  login(@Body() dto:CreateUserDto){
    return this.authService.login(dto);
  }
}
