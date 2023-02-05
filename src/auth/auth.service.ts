import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { User } from '../users/entities/user.entity';
import { Token } from './enitities/token.entity';

@Injectable()
export class AuthService {
  constructor(private userService:UsersService, private  jwtService:JwtService) {
  }

  async login(dto:CreateUserDto) {
    const user = await User.findOne({where:{nickname:dto.nickname}})
    if (!user) {
      throw new HttpException("Can't find user profile. Try again", HttpStatus.BAD_REQUEST)
    }
    const isPassEquals = await bcrypt.compare(dto.password, user.password);
    if (!isPassEquals) {
      throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST)
    }

    const tokens = await this.generateTokens(user);

    await this.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}
  }

  async logout(refreshToken:string) {
    const token = await this.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    const userData = await this.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    const user = await User.findByPk(userData.id);

    const tokens = await this.generateTokens(user);

    await this.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user}
  }

  async registration(dto:CreateUserDto) {
    const candidate = await User.findOne({where:{nickname:dto.nickname}})
    if (candidate) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await User.create({...dto, password:hashPassword});

    const tokens = await this.generateTokens(user);
    await this.saveToken(user.id, tokens.refreshToken);

    return {...tokens, user};
  }



  private async generateTokens(user:User){
    const payload = {login:user.nickname,id:user.id};
    return {
      accessToken: this.jwtService.sign(payload,{secret: process.env.JWT_ACCESS_SECRET, expiresIn:'60s'}),
      refreshToken: this.jwtService.sign(payload,{secret: process.env.JWT_REFRESH_SECRET, expiresIn:'1h'})
    };
  }

  private async validateAccessToken(token:string){
    try {
      const userData = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
      return userData;
    } catch (e) {
      return null;
    }
  }

  private async validateRefreshToken(token:string){
    try {
      const userData = this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
      return userData;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

  async saveToken(userId:number, refreshToken:string) {
    const tokenData = await Token.findOne({where:{userId}})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({userId, refreshToken})
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({where:{refreshToken}});
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({where:{refreshToken}})
    return tokenData;
  }

  private async validateUser(dto:CreateUserDto){
    const user = await this.userService.findByNick(dto.nickname);
    if(!user){
      throw new UnauthorizedException({message:"Incorrect nickname or password"});
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passwordEquals){
      return user;
    }
    else{
      throw new UnauthorizedException({message:"Incorrect nickname or password"});
    }
  }
}
