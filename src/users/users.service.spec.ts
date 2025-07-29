import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { mockUsers } from './tests/mocks/users.mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    invalidAlreadyExistingUser,
    validUserAfterCreation,
    validUserToCreate,
} from './tests/mocks/services/createUser.mocks';
import { UserErrorMessages } from '@app/shared';
import { CreateUserDto } from '@app/shared/dtos';
import {
    expectedNotFoundException,
    expectedValidInputFindUserByEmail,
    NotFoundUserByEmail,
    validInputFindUserByEmail,
} from './tests/mocks/services/findUserByEmail.mocks';
import {
    NotFoundUserById,
    validInputFindUserById,
    expectedValidInputFindUserById,
} from './tests/mocks/services/findUserById.mocks';
import {
    expectedAddCountLink,
    expectedInvalidAddCounLink,
    invalidAddCounLink,
    validAddCountLink,
} from './tests/mocks/services/addCountToUser.mocks';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<UserEntity>;
    let users: Partial<UserEntity>[];

    const mockQueryBuilder = {
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest
            .fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    affected: 0,
                });
            })
            .mockResolvedValue({
                affected: 1,
            }),
    };

    const mockRepository = {
        create: jest.fn((query: CreateUserDto) => ({
            ...validUserAfterCreation,
            ...query,
        })),
        insert: jest.fn().mockImplementation((query: UserEntity) => {
            const userFound = mockUsers.find(user => query.email === user.email);

            if (userFound) {
                return Promise.reject(new Error(UserErrorMessages.UserAlreadyExists));
            } else {
                mockUsers.push(query);
                return Promise.resolve(true);
            }
        }),
        findOneBy: jest.fn().mockImplementation((query: FindOptionsWhere<UserEntity>) => {
            if (query?.email) {
                const userFound = mockUsers.find(user => user.email === query?.email);

                if (userFound) {
                    return Promise.resolve(userFound);
                } else {
                    return Promise.resolve(null);
                }
            }

            if (query?.id) {
                const userFound = mockUsers.find(user => user.id === query?.id);

                if (userFound) {
                    return Promise.resolve(userFound);
                } else {
                    return Promise.resolve(null);
                }
            }
        }),
        createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        users = Object.create(mockUsers);
    });

    describe('when calling createUser service', () => {
        it('should throw a error when trying to create new user with already registered email into database', async () => {
            const result = service.createUser(invalidAlreadyExistingUser);
            await expect(result).rejects.toThrow(UserErrorMessages.UserAlreadyExists);
        });
        it('should create a new user into database and return User', async () => {
            const result = await service.createUser(validUserToCreate);
            expect(result).toStrictEqual(validUserAfterCreation);
        });
    });

    describe('when calling findUserByEmail service', () => {
        it('should throw a NotFoundException when trying to find a email not registered into database', async () => {
            const result = service.findUserByEmail(NotFoundUserByEmail);
            await expect(result).rejects.toThrow(expectedNotFoundException);
        });
        it('should find a user by a registered email and return a User', async () => {
            const result = await service.findUserByEmail(validInputFindUserByEmail);
            expect(result).toStrictEqual(expectedValidInputFindUserByEmail);
        });
    });

    describe('when calling findUserById service', () => {
        it('should throw a NotFoundException when trying to find non-existent id into database', async () => {
            const result = service.findUserById(NotFoundUserById);
            await expect(result).rejects.toThrow(expectedNotFoundException);
        });
        it('should find the user by id and return a User', async () => {
            const result = await service.findUserById(validInputFindUserById);
            expect(result).toStrictEqual(expectedValidInputFindUserById);
        });
    });

    describe('when calling addCountLink service', () => {
        it("should throw a NotFoundException when trying to update a non-existent user's linksCount", async () => {
            const result = service.addCountLink(invalidAddCounLink);
            await expect(result).rejects.toThrow(expectedInvalidAddCounLink);
        });
        it("should update the user's linksCount by 1 and return true", async () => {
            const result = await service.addCountLink(validAddCountLink);
            expect(result).toEqual(expectedAddCountLink);
        });
    });
});
