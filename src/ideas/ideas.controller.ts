import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Idea } from './entities/idea.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Идеи')
@Controller('ideas')
@UseGuards(JwtAuthGuard)
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @ApiOperation({summary:"Создание идеи"})
  @ApiOkResponse({status:200, type:Idea})
  @Post()
  create(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }

  @ApiOperation({summary:"Получение всех идей"})
  @ApiOkResponse({status:200, type:[Idea]})
  @Get()
  findAll() {
    return this.ideasService.findAll();
  }

  @ApiOperation({summary:"Получение по ключу"})
  @ApiOkResponse({status:200, type:Idea})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideasService.findOne(+id);
  }

  @ApiOperation({summary:"Получение по ключу доски"})
  @ApiOkResponse({status:200, type:[Idea]})
  @Get('/board/:id')
  findByBoard(@Param('id') id: string) {
    return this.ideasService.findByBoardId(+id);
  }

  @ApiOperation({summary:"Редактирование идеи"})
  @ApiOkResponse({status:200, type:Idea})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideasService.update(+id, updateIdeaDto);
  }

  @ApiOperation({summary:"Удаление идеи"})
  @ApiOkResponse({status:200, type:Idea})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ideasService.remove(+id);
  }
}
