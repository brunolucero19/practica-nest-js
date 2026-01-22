import { Controller, Get, Param, Post, Body, ParseIntPipe, Delete, Patch, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDTO: CreateUserDto){
    return this.usersService.create(createUserDTO);
  }
  
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch(':id')
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDto){
    return this.usersService.partialUpdate(id, updateUserDTO);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
