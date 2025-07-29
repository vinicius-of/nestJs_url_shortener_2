import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';
import { Auth } from '../contracts/auth.contract';

export class AuthenticateDto implements Auth {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(20)
    password: string;
}

export class CreateLoginDto implements Auth {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
