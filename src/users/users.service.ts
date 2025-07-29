import { User, UserErrorMessages } from '@app/shared';
import {
    AddCountLinkDto,
    CreateUserDto,
    FindUserByEmailDto,
    FindUserByIdDto,
} from '@app/shared/dtos';
import { IUsersServices } from '@app/shared/services';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService implements IUsersServices {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(data: CreateUserDto): Promise<User> {
        const userFound = await this.userRepository.findOneBy({
            email: data.email,
        });

        if (userFound) {
            throw new BadRequestException(UserErrorMessages.UserAlreadyExists);
        }

        const newUser = this.userRepository.create({
            email: data.email,
            name: data.name,
        });

        await this.userRepository.insert(newUser);

        return newUser;
    }
    async findUserByEmail(data: FindUserByEmailDto): Promise<User> {
        const userFound = await this.userRepository.findOneBy({
            email: data.email,
        });

        if (!userFound) {
            throw new NotFoundException(UserErrorMessages.UserNotFound);
        }

        return userFound;
    }

    async findUserById(data: FindUserByIdDto): Promise<User> {
        const userFound = await this.userRepository.findOneBy({
            id: data.id,
        });

        if (!userFound) {
            throw new NotFoundException(UserErrorMessages.UserNotFound);
        }

        return userFound;
    }

    async addCountLink(data: AddCountLinkDto): Promise<boolean> {
        const userFound = await this.findUserById({
            id: data.id,
        });

        if (!userFound) {
            throw new NotFoundException(UserErrorMessages.UserNotFound);
        }

        await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
                linksCount: () => 'linksCount + 1',
            })
            .where('id = :id', {
                id: data.id,
            })
            .execute();

        return true;
    }
}
