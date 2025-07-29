import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, FindUserByEmailDto } from '@app/shared/dtos';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({
        summary: 'Creates new user (tests only)',
    })
    @ApiResponse({
        status: 201,
        description: 'User created with success',
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists',
    })
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.createUser(data);
    }

    @Get('/:email')
    @ApiOperation({
        summary: 'Find user by email (tests only)',
    })
    @ApiResponse({
        status: 200,
        description: 'User found',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error by trying to find user in the database',
    })
    async findUserByEmail(@Param() params: FindUserByEmailDto) {
        return await this.usersService.findUserByEmail(params);
    }
}
