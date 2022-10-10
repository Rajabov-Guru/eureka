import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Board } from '../../boards/entities/board.entity';

interface IdeaCreationAttrs{
  text:string;
}


@Table({
  tableName:'ideas',
  updatedAt:false
})
export class Idea extends Model<Idea,IdeaCreationAttrs>{

  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @Column({type:DataType.TEXT, allowNull:false})
  text:string;

  @BelongsTo(()=>Board)
  board:Board;

}

