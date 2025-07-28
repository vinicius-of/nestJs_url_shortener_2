import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtAuthConfig } from './configurations/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local', '.env.docker'],
            load: [jwtAuthConfig],
            expandVariables: true,
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            global: true,
            ...jwtAuthConfig.asProvider(),
        }),
    ],
})
export class ProjectConfigModule {}
