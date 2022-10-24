import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { IdeasModule } from './ideas/ideas.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { Idea } from './ideas/entities/idea.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Board,Idea],
      autoLoadModels:true}),
    UsersModule,
    IdeasModule,
    BoardsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
