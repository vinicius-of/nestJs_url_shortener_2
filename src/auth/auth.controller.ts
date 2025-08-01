import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto, CreateLoginDto } from '@app/shared/dtos/auth.dto.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/jwtGuard/jwtGuard.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiOperation({
        summary: 'Login with credentials created beforehad and returns JWT token to use',
    })
    @ApiResponse({
        status: 200,
        description: 'Login successciful',
    })
    @ApiResponse({
        status: 404,
        description: 'Login was not found or rejected by wrong credentials',
    })
    async login(@Body() data: AuthenticateDto) {
        return await this.authService.autheticate(data);
    }

    @Post('/signup')
    @ApiOperation({
        summary: 'Create a new login',
    })
    @ApiResponse({
        status: 201,
        description: 'Login created with success',
    })
    @ApiResponse({
        status: 400,
        description: 'Login already exists',
    })
    @ApiResponse({
        status: 500,
        description: 'Login was not created',
    })
    async createLogin(@Body() data: CreateLoginDto) {
        await this.authService.createLogin(data);
        return await this.authService.autheticate(data);
    }
}
