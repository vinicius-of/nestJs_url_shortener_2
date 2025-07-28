import { ConfigModule, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtAuthConfig = registerAs<JwtModuleOptions>('jwtAuthConfig', async () => {
    await ConfigModule.envVariablesLoaded;

    return {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    };
});
