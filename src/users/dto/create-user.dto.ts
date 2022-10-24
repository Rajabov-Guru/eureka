import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({example:'Noobmaster96', description:"Никнейм"})
  readonly nickname:string;

  @ApiProperty({example:'qwerty', description:"Пароль"})
  readonly password:string;

  @ApiProperty({example:'*URL*', description:"Аватар"})
  readonly avatar:string;
}
