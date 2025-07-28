import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@app/database';
import { ProjectConfigModule } from '@app/config';

@Module({
    imports: [UsersModule, UrlsModule, AuthModule, DatabaseModule, ProjectConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
