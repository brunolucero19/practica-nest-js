import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users = [{
    id: 1,
    name: 'Bruno',
    email: 'bruno@example.com'
  }, 
  {
    id: 2,
    name: 'Sofía',
    email: 'sofia@example.com'
  },
  {
    id: 3,
    name: 'Lionel',
    email: 'lionel@example.com'
  }]

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  create(createUserDTO: CreateUserDto){
    const newUser = {
      id: this.users.length + 1,
      ...createUserDTO
    }
    this.users.push(newUser);
    return newUser;
  }

  partialUpdate(id: number, updateUserDTO: UpdateUserDto){
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDTO
    }
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const removedUser = this.users.splice(userIndex, 1);
    return removedUser[0];
  }
}
