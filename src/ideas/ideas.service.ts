import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Idea } from './entities/idea.entity';

@Injectable()
export class IdeasService {

  constructor(@InjectModel(Idea) private ideaRepository: typeof Idea) {
  }

  async create(createIdeaDto: CreateIdeaDto) {
    const idea = await this.ideaRepository.create(createIdeaDto);
    return idea;
  }

  async findAll() {
    const ideas = await this.ideaRepository.findAll();
    return ideas;
  }

  async findOne(id: number) {
    const idea = await this.ideaRepository.findByPk(id);
    return idea;
  }

  async findByBoardId(id: number) {
    const ideas = await this.ideaRepository.findAll({where:{boardId:id}});
    return ideas;
  }

  async update(id: number, updateIdeaDto: UpdateIdeaDto) {
    const idea = await this.ideaRepository.findByPk(id);
    await idea.update(updateIdeaDto);
    await idea.save();
    return idea;
  }

  async remove(id: number) {
    const idea = await this.ideaRepository.destroy({where:{id}});
    return idea;
  }
}
