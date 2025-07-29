import { CreateUserDto } from '@app/shared/dtos';
import { randomUUID } from 'crypto';
import { UserEntity } from 'src/users/entities/user.entity';

export const validUserToCreate: CreateUserDto = {
    email: 'vinicius@gmail.com',
    name: 'Vinicius',
};

export const validUserAfterCreation: Partial<UserEntity> = {
    ...validUserToCreate,
    id: '63cbdd38-8b78-461e-85ef-a0867dcbb767',
    createdAt: new Date(),
    updatedAt: new Date(),
    linksCount: 0,
};

export const invalidAlreadyExistingUser: CreateUserDto = {
    email: 'sborell0@xinhuanet.com',
    name: 'Borell',
};
