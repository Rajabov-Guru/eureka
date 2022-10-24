import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }


  async create(createUserDto: CreateUserDto) {
    const user =  await this.userRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async findByNick(nick:string){
    const user = await this.userRepository.findOne({where:{nickname:nick}});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);
    await user.update(updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: number) {
    const result = await this.userRepository.destroy({where:{id}});
    return result;
  }
}
