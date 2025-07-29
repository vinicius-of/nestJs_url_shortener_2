import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urlsService: UrlsService) {}

    @Post()
    create() {}

    @Get()
    findAll() {}

    @Get(':id')
    findOne(@Param('id') id: string) {}

    @Patch(':id')
    update(@Param('id') id: string) {}

    @Delete(':id')
    remove(@Param('id') id: string) {}
}
