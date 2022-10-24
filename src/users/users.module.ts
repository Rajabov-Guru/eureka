import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    forwardRef(()=>AuthModule),
    SequelizeModule.forFeature([User]),
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
