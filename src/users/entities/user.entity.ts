import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Board } from '../../boards/entities/board.entity';

interface UserCreationAttrs{
  nickname:string;
  password:string;
  avatar:string;
}


@Table({
  tableName:'users',
  createdAt:false,
  updatedAt:false
})
export class User extends Model<User,UserCreationAttrs>{

  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @Column({type:DataType.STRING, unique:true, allowNull:false})
  nickname:string;

  @Column({type:DataType.STRING, allowNull:false})
  password:string;

  @Column({type:DataType.STRING, allowNull:false})
  avatar:string;

  @HasMany(()=>Board,{ onDelete: 'cascade' })
  boards:Board[];

}