import { AuthResult } from '@app/shared/contracts/auth.contract';
import { AuthenticateDto, CreateLoginDto } from '@app/shared/dtos/auth.dto.interface';
import { IAuthService } from '@app/shared/services';
import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthErrorMessages } from '@app/shared';
import { compare, hashSync } from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import { bcryptConfig } from '@app/config/configurations/bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@app/shared/contracts/jwtPayload.contract';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @Inject(bcryptConfig.KEY) private readonly bcryptConfigs: ConfigType<typeof bcryptConfig>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async createLogin(data: CreateLoginDto): Promise<void> {
        const loginExists = await this.authRepository.findOneBy({
            email: data.email,
        });

        if (loginExists) {
            throw new BadRequestException(AuthErrorMessages.LoginAlreadyExists);
        }

        const hashPassword = hashSync(data.password, this.bcryptConfigs.salt);

        const newUser = await this.usersService.createUser({
            email: data.email,
            name: data.name,
        });

        const newLogin = this.authRepository.create({
            email: data.email,
            password: hashPassword,
            user: newUser,
        });

        await this.authRepository.insert(newLogin);
    }

    async autheticate(data: AuthenticateDto): Promise<AuthResult> {
        const loginFound = await this.authRepository.findOne({
            where: {
                email: data.email,
            },
            relations: ['user'],
        });

        if (!loginFound) {
            throw new NotFoundException(AuthErrorMessages.LoginNotFound);
        }

        const passwordAccepted = await compare(data.password, loginFound.password);

        if (!passwordAccepted) {
            throw new UnauthorizedException(AuthErrorMessages.WrongCredentials);
        }

        const tokenPayload = {
            sub: loginFound.id,
            email: loginFound.email,
            userId: loginFound.user.id,
        } as JwtPayload;

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accessToken,
            email: loginFound.email,
            id: loginFound.id,
        };
    }
}
