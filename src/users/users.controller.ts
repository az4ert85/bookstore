import { Controller, Get, Post, Body, Patch, Param, Delete, Response, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    const userId = Number.parseInt(id, 10);
    if (userId)
      return this.usersService.findById(userId);
  }

  @Get("email/:email")
  findEmail(@Param('email') email:string) {
    email = decodeURI(email)
    return this.usersService.findByEmail(email)
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto){
    const user = this.usersService.create(createUserDto);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = Number.parseInt(id, 10);
    if (userId)
      return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = Number.parseInt(id, 10);
    if (userId)
      return this.usersService.remove(+id);
  }
}
