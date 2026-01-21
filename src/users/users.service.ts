import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  private users = [{
    id: 1,
    name: 'Bruno',
    email: 'bruno@example.com'
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
}
