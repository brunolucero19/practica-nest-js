import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}


  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

   findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    // Verificar si el email ya existe
    const existingUser = await this.userModel.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    return this.userModel.create(data);
  }

  partialUpdate(id: number, data: UpdateUserDto) {
    // Buscar usuario
    const user = this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Actualizar usuario
    return this.userModel.update(data, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
