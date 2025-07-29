import { User } from '../contracts/user.contract';
import {
    CreateUserDto,
    FindUserByEmailDto,
    FindUserByIdDto,
    AddCountLinkDto,
} from '../dtos/users.dto.interface';

export interface IUsersServices {
    createUser: (data: CreateUserDto) => Promise<User>;
    findUserByEmail: (data: FindUserByEmailDto) => Promise<User>;
    findUserById: (data: FindUserByIdDto) => Promise<User>;
    addCountLink: (data: AddCountLinkDto) => Promise<boolean>;
}
