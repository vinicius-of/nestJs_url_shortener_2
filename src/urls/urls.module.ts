import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity]), UsersModule],
    controllers: [UrlsController],
    providers: [UrlsService],
    exports: [UrlsService],
})
export class UrlsModule {}
