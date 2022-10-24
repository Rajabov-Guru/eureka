import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {
  }

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardRepository.create(createBoardDto);
    return board;
  }

  async findAll() {
    const boards =  await this.boardRepository.findAll();
    return boards;
  }

  async findOne(id: number) {
    const board  = await this.boardRepository.findByPk(id);
    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findByPk(id);
    await board.update(updateBoardDto);
    await board.save();
    return board;
  }

  async remove(id: number) {
    const board =  await this.boardRepository.destroy({where:{id}})
    return board;
  }
}
