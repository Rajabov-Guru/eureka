import { ApiProperty } from '@nestjs/swagger';

export class CreateIdeaDto {
  @ApiProperty({example:"Какой-то текст", description:"Описание идеи"})
  readonly text:string;

  @ApiProperty({example:"1", description:"ID доски"})
  readonly boardId:number;
}
