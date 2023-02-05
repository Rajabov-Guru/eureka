import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports:[
    SequelizeModule.forFeature([Board]),
    forwardRef(()=>AuthModule),
  ]
})
export class BoardsModule {}
