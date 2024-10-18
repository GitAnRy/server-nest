import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
            private userRepository: Repository<User>,
            private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const role = await this.roleService.getRoleByValue(`USER`);
        const user = await this.userRepository.save({roles: [role], ...dto});
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: {
                roles: true,
            }
        });
        return users;
    }

    async getUserByEmail(byEmail: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: byEmail,
            },
            relations: {
                roles: true,
            }
        });
        return user;
    }
 
    async getUserById(byId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: byId,
            },
            relations: {
                roles: true,
            }
        });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: dto.userId,
            },
            relations: {
                roles: true,
            }
        });
        const role = await this.roleService.getRoleByValue(dto.value);

        if (user && role) {
            user.roles.push(role);
            this.userRepository.save(user);
            return user;
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: dto.userId,
            },
            relations: {
                roles: true,
            }
        });

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        user.banned = true;
        user.banReason = dto.banReason;
        this.userRepository.save(user);
        return user;
    }

}
