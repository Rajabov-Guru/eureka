import { forwardRef, Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Idea } from './entities/idea.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [IdeasController],
  providers: [IdeasService],
  imports:[
    SequelizeModule.forFeature([Idea]),
    forwardRef(()=>AuthModule),
  ]
})
export class IdeasModule {}
