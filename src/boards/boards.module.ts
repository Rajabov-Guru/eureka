import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports:[
    SequelizeModule.forFeature([Board]),
  ]
})
export class BoardsModule {}
