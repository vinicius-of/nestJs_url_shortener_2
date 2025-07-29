import { registerAs } from '@nestjs/config';

export const bcryptConfig = registerAs('bcrypt', () => ({
    salt: Number(process.env.BCRYPT_SALT) || 10,
}));
