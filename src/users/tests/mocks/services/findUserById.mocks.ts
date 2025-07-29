import { UserErrorMessages } from '@app/shared';
import { FindUserByIdDto } from '@app/shared/dtos';
import { UserEntity } from 'src/users/entities/user.entity';

export const validInputFindUserById: FindUserByIdDto = {
    id: '6887052dfc13ae2105a05447',
};

export const NotFoundUserById: FindUserByIdDto = {
    id: 'idnonexistent',
};

export const expectedNotFoundException = UserErrorMessages.UserNotFound;

export const expectedValidInputFindUserById: Partial<UserEntity> = {
    id: '6887052dfc13ae2105a05447',
    email: 'sborell0@xinhuanet.com',
    name: 'Borell',
    linksCount: 84,
    createdAt: new Date('2025-05-16'),
    updatedAt: new Date('2024-08-14'),
};
