import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({example:"Идеи для проектов", description:"Название доски"})
  readonly name:string;

  @ApiProperty({example:"2", description:"ID пользователя"})
  readonly userId:number;
}
