import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { mockLogins } from './tests/mocks/auth.mocks';
import {
    invalidCreateLoginBadRequest,
    validCreateLoginInput,
} from './tests/services/createLogin.mock';
import { AuthErrorMessages } from '@app/shared';
import { bcryptConfig } from '@app/config/configurations/bcrypt';
import { mockBcrypt } from './tests/configs/bcrypt.mock';
import { CreateUserDto } from '@app/shared/dtos';
import { createMockUser } from './tests/mocks/users.mocks';
import { UsersService } from 'src/users/users.service';
import { ProjectConfigModule } from '@app/config';
import {
    invalidAutheticateNotFound,
    invalidAutheticateUnauthorized,
    validAutheticateInput,
} from './tests/services/authenticate.mock';
import { compareSync } from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let logins: Partial<AuthEntity>[];

    const mockRepository = {
        findOneBy: jest.fn().mockImplementation((query: FindOptionsWhere<AuthEntity>) => {
            return logins.find(login => login.email === query.email);
        }),
        insert: jest.fn().mockImplementation((query: AuthEntity) => {
            logins.push(query);
        }),
        create: jest.fn((query: DeepPartial<AuthEntity>) => ({
            ...query,
        })),
    };

    const mockUsersService = {
        createUser: jest
            .fn()
            .mockResolvedValueOnce((query: CreateUserDto) => createMockUser(query)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ProjectConfigModule],
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(AuthEntity),
                    useValue: mockRepository,
                },
                {
                    provide: bcryptConfig.KEY,
                    useValue: mockBcrypt,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        logins = Object.create(mockLogins);
    });

    describe('when calling the createLogin service', () => {
        it('should throw a BadRequestException and inform that the login already exists', async () => {
            const result = service.createLogin(invalidCreateLoginBadRequest);
            await expect(result).rejects.toThrow(AuthErrorMessages.LoginAlreadyExists);
        });
        it('should create a new login and compares the password', async () => {
            const expectedEmail = validCreateLoginInput.email;
            const result = await service.createLogin(validCreateLoginInput);

            const loginFound = logins.find(login => login.email === expectedEmail);

            await expect(result).toBeUndefined();
            expect(loginFound).toBeDefined();
            expect(loginFound).toHaveProperty('password');
            expect(compareSync(validCreateLoginInput.password, loginFound!.password!));
        });
    });

    describe('when calling the authenticate service', () => {
        it('should throw a NotFoundException informing that login was not found', async () => {
            const result = service.autheticate(invalidAutheticateNotFound);
            await expect(result).rejects.toThrow(AuthErrorMessages.LoginNotFound);
        });
        it('should throw a UnauthorizedException informing that the credentials are wrong', async () => {
            const result = service.autheticate(invalidAutheticateUnauthorized);
            await expect(result).rejects.toThrow(AuthErrorMessages.WrongCredentials);
        });
        it('should check the login and return a assigned access token', async () => {
            const result = await service.autheticate(validAutheticateInput);
            expect(result).toBeDefined();
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('id');
        });
    });
});
