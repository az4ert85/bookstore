import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  public async findAll():Promise<User[]> {
    return await this.repo.find();
  }

  public async findById(id: number):Promise<User> {
    const user = await this.repo.findOneBy({id});
    if (!user)
      throw new NotFoundException(`User ${JSON.stringify(user)} hasn't been created`)
    return user;
  }

  public async findByEmail(email: string):Promise<User> {
    const user = await this.repo.findOneBy({email});
    if (!user)
      throw new NotFoundException(`User ${JSON.stringify(user)} hasn't been created`)
    return user;
  }

  public async create(createUserDto: CreateUserDto):Promise<User> {
    let user:User=this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  public async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  public updateRefreshToken(userId: number, refreshToken: string) {
    return this.repo.update(userId, { refreshToken });
  }

  public async remove(id: number):Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with id ${id} hasn't been created`);
  }
}
