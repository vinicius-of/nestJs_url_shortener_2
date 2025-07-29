import { UserErrorMessages } from '@app/shared';
import { FindUserByEmailDto } from '@app/shared/dtos';
import { UserEntity } from 'src/users/entities/user.entity';

export const validInputFindUserByEmail: FindUserByEmailDto = {
    email: 'sborell0@xinhuanet.com',
};

export const NotFoundUserByEmail: FindUserByEmailDto = {
    email: 'emailnotregistered@gmail.com',
};

export const expectedNotFoundException = UserErrorMessages.UserNotFound;

export const expectedValidInputFindUserByEmail: UserEntity = {
    id: '6887052dfc13ae2105a05447',
    email: 'sborell0@xinhuanet.com',
    name: 'Borell',
    linksCount: 84,
    createdAt: new Date('2025-05-16'),
    updatedAt: new Date('2024-08-14'),
};
