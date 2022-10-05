import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      models: [],
      autoLoadModels:true,
      dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
