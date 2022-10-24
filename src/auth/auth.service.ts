import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService:UsersService, private  jwtService:JwtService) {
  }

  async login(dto:CreateUserDto){
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto:CreateUserDto){
    const candidate = await this.userService.findByNick(dto.nickname);
    if(candidate){
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({...dto, password:hashPassword});
    return this.generateToken(user);
  }

  private async generateToken(user:User){
    const payload = {login:user.nickname,id:user.id};
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(dto:CreateUserDto){
    const user = await this.userService.findByNick(dto.nickname);
    if(!user){
      throw new UnauthorizedException({message:"Incorrect email or password"});
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passwordEquals){
      return user;
    }
    else{
      throw new UnauthorizedException({message:"Incorrect email or password"});
    }
  }
}
