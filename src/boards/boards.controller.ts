import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';

@ApiTags('Доски')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({summary:"Создание доски"})
  @ApiOkResponse({status:200, type:Board})
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @ApiOperation({summary:"Получение всех досок"})
  @ApiOkResponse({status:200, type:[Board]})
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({summary:"Получение доски по ключу"})
  @ApiOkResponse({status:200, type:Board})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @ApiOperation({summary:"Редактирование доски"})
  @ApiOkResponse({status:200, type:Board})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @ApiOperation({summary:"Удаление доски"})
  @ApiOkResponse({status:200, type:Board})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
