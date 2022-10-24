import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:"Создание пользователя"})
  @ApiOkResponse({status:200, type:User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:"Получение всех пользователей"})
  @ApiOkResponse({status:200, type:[User]})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary:"Получение пользователя по ключу"})
  @ApiOkResponse({status:200, type:User})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary:"Редактирование пользователя"})
  @ApiOkResponse({status:200, type:User})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary:"Удаление пользователя"})
  @ApiOkResponse({status:200, type:User})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
