import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

interface TokenCreationAttrs{
  refreshToken:string;
  userId:number;
}

@Table({
  tableName:'token',
  updatedAt:false,
  createdAt:false
})
export class Token extends Model<Token,TokenCreationAttrs>{

  @ApiProperty({example:"1", description:"Ключ"})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number;

  @ApiProperty({example:"sdhbsdnvjsdnvjsvnjn=wfrj", description:"Токен"})
  @Column({type:DataType.STRING, allowNull:false})
  refreshToken:string;

  @ApiProperty({example:"1", description:"ID пользователя"})
  @ForeignKey(()=>User)
  @Column({type:DataType.INTEGER, allowNull:false})
  userId:number;

  @BelongsTo(()=>User)
  user:User;

}