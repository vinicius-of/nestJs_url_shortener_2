import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from '../contracts/user.contract';

export class CreateUserDto implements Pick<User, 'email' | 'name'> {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class FindUserByEmailDto implements Pick<User, 'email'> {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class AddCountLinkDto {
    @IsUUID()
    id: string;
}

export class FindUserByIdDto implements Pick<User, 'id'> {
    @IsUUID()
    id: string;
}
