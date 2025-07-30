import { UrlErrorMessages } from '@app/shared';
import { RedirectViaShortUrlDto } from '@app/shared/dtos';
import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { UrlsService } from './urls/urls.service';

@Controller()
export class AppController {
    constructor(private readonly urlsService: UrlsService) {}

    @Get()
    @ApiOperation({
        description: 'Health Check',
    })
    @ApiResponse({
        status: 200,
    })
    healthCheck() {
        return HttpStatus.OK;
    }

    @Get('/:shortUrl')
    @ApiOperation({
        summary: 'Redirects the client to the fullUrl saved',
    })
    @ApiResponse({
        status: 301,
        description: 'The user is redirected with success',
    })
    @ApiResponse({
        status: 404,
        description: UrlErrorMessages.UrlNotFound,
    })
    async redirectViaShortUrl(
        @Param() params: RedirectViaShortUrlDto,
        @Response() res: ExpressResponse,
    ) {
        const fullUrlFound = await this.urlsService.accessShortLink(params);
        return res.status(301).redirect(fullUrlFound.fullUrl);
    }
}
