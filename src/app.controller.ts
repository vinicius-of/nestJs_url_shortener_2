import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
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
}
