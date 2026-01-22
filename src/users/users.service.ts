import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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


  // findAll() {
  //   return this.users;
  // }

  // findOne(id: number) {
  //   const user = this.users.find(user => user.id === id);
  //   if (!user) {
  //     throw new HttpException('User not found', 404);
  //   }
  //   return user;
  // }

   findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  create(data: CreateUserDto) {
    return this.userModel.create(data);
  }

  // partialUpdate(id: number, updateUserDTO: UpdateUserDto){
  //   const userIndex = this.users.findIndex(user => user.id === id);
  //   if (userIndex === -1) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   const updatedUser = {
  //     ...this.users[userIndex],
  //     ...updateUserDTO
  //   }
  //   this.users[userIndex] = updatedUser;
  //   return updatedUser;
  // }

  // remove(id: number) {
  //   const userIndex = this.users.findIndex(user => user.id === id);
  //   if (userIndex === -1) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   const removedUser = this.users.splice(userIndex, 1);
  //   return removedUser[0];
  // }
}
