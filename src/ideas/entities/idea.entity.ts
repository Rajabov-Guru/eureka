import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Board } from '../../boards/entities/board.entity';
import { ApiProperty } from '@nestjs/swagger';

interface IdeaCreationAttrs{
  title:string;
  text:string;
  boardId:number;
}


@Table({
  tableName:'ideas',
  updatedAt:false
})
export class Idea extends Model<Idea,IdeaCreationAttrs>{

  @ApiProperty({example:"1", description:"Ключ"})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @ApiProperty({example:"Идея №1", description:"Заголовок"})
  @Column({type:DataType.TEXT, allowNull:false, validate:{notEmpty: true,}})
  title:string;

  @ApiProperty({example:"Какой-то текст", description:"Описание идеи"})
  @Column({type:DataType.TEXT, allowNull:false, validate:{notEmpty: true,}})
  text:string;

  @ApiProperty({example:"1", description:"ID доски"})
  @ForeignKey(()=>Board)
  @Column({type:DataType.INTEGER, allowNull:false})
  boardId:number;

  @BelongsTo(()=>Board)
  board:Board;

}

