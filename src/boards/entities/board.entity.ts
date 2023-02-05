import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Idea } from '../../ideas/entities/idea.entity';
import { ApiProperty } from '@nestjs/swagger';

interface BoardCreationAttrs{
  name:string;
  userId:number;
}


@Table({
  tableName:'boards',
  updatedAt:false
})
export class Board extends Model<Board,BoardCreationAttrs>{
  @ApiProperty({example:"1", description:"Ключ"})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @ApiProperty({example:"Идеи для проектов", description:"Название доски"})
  @Column({type:DataType.STRING, allowNull:false, validate:{notEmpty: true,}})
  name:string;

  @ApiProperty({example:"2", description:"ID пользователя"})
  @ForeignKey(()=>User)
  @Column({type:DataType.INTEGER, allowNull:false})
  userId:number;

  @BelongsTo(()=>User)
  user:User;

  @HasMany(()=>Idea,{ onDelete: 'cascade' })
  ideas:Idea[];

}
