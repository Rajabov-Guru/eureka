import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Board } from '../../boards/entities/board.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({example:'1', description:"Ключ"})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @ApiProperty({example:'Noobmaster96', description:"Никнейм"})
  @Column({type:DataType.STRING, unique:true, allowNull:false})
  nickname:string;

  @ApiProperty({example:'qwerty', description:"Пароль"})
  @Column({type:DataType.STRING, allowNull:false})
  password:string;

  @ApiProperty({example:'*URL*', description:"Аватар"})
  @Column({type:DataType.STRING, allowNull:false})
  avatar:string;

  @HasMany(()=>Board,{ onDelete: 'cascade' })
  boards:Board[];

}
