import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Idea } from '../../ideas/entities/idea.entity';

interface BoardCreationAttrs{
  name:string;
}


@Table({
  tableName:'boards',
  updatedAt:false
})
export class Board extends Model<Board,BoardCreationAttrs>{

  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @Column({type:DataType.STRING, allowNull:false})
  name:string;

  @BelongsTo(()=>User)
  user:User;

  @HasMany(()=>Idea,{ onDelete: 'cascade' })
  ideas:Idea[];

}
