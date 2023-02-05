import { ApiProperty } from '@nestjs/swagger';

export class CreateIdeaDto {
  @ApiProperty({example:"Идея №1", description:"Заголовок"})
  readonly title:string;

  @ApiProperty({example:"Какой-то текст", description:"Описание идеи"})
  readonly text:string;

  @ApiProperty({example:"1", description:"ID доски"})
  readonly boardId:number;
}
