import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Response,
    UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlErrorMessages } from '@app/shared';
import { CreateUrlDto, RedirectViaShortUrlDto, EditUrlDto, RemoveUrlDto } from '@app/shared/dtos';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '@app/shared/decorators/currentUser.decorator';
import { JwtPayload } from '@app/shared/contracts/jwtPayload.contract';
import { AuthGuard } from 'src/jwtGuard/jwtGuard.guard';
import { HasToken } from 'src/tokenGuard/token.guard';

@Controller('/urls')
export class UrlsController {
    constructor(private readonly urlsService: UrlsService) {}

    @Post('/shorten')
    @UseGuards(HasToken)
    @ApiOperation({
        summary: 'Create a new short URL and return its data',
    })
    @ApiResponse({
        status: 200,
        description: 'URL was created with success',
    })
    @ApiResponse({
        status: 404,
        description: 'The user could not been found to create its URL.',
    })
    async create(@Body() data: CreateUrlDto, @CurrentUser() user: JwtPayload) {
        return await this.urlsService.create(data, user?.userId);
    }

    @Get('/get/:shortUrl')
    @ApiOperation({
        summary: 'Returns shortUrl data to the client',
    })
    @ApiResponse({
        status: 200,
        description: 'URL was found with success',
    })
    @ApiResponse({
        status: 404,
        description: UrlErrorMessages.UrlNotFound,
    })
    async findShortUrl(@Param() params: RedirectViaShortUrlDto) {
        return await this.urlsService.accessShortLink(params);
    }

    @Get('/list')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Finds all shortUrls by the userId from User',
    })
    @ApiResponse({
        status: 200,
        description: 'All shortsUrls returns to the client',
    })
    async listAllUrls(@CurrentUser() user: JwtPayload) {
        return await this.urlsService.listAllUrls(user.userId);
    }

    @Put()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Updates the shortUrl selected',
    })
    @ApiResponse({
        status: 200,
        description: 'Selected shortUrl was updated',
    })
    @ApiResponse({
        status: 404,
        description: UrlErrorMessages.UrlNotFound,
    })
    async update(@Body() data: EditUrlDto, @CurrentUser() user: JwtPayload) {
        return await this.urlsService.update(data, user.userId);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Removes logicly the shortUrl selected from database (JWT only)',
    })
    @ApiResponse({
        status: 200,
        description: 'Selected shortUrl was removed',
    })
    @ApiResponse({
        status: 404,
        description: UrlErrorMessages.UrlNotFound,
    })
    async remove(@Param() params: RemoveUrlDto, @CurrentUser() user: JwtPayload) {
        return await this.urlsService.remove(params, user.userId);
    }
}
