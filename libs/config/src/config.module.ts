import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtAuthConfig } from './configurations/jwt';
import { JwtModule } from '@nestjs/jwt';
import { bcryptConfig } from './configurations/bcrypt';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local', '.env.docker'],
            load: [jwtAuthConfig, bcryptConfig],
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
