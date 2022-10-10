import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Idea } from './entities/idea.entity';

@Module({
  controllers: [IdeasController],
  providers: [IdeasService],
  imports:[
    SequelizeModule.forFeature([Idea]),
  ]
})
export class IdeasModule {}
