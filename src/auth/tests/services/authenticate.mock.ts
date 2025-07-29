import { AuthResult } from '@app/shared/contracts/auth.contract';
import { AuthenticateDto } from '@app/shared/dtos/auth.dto.interface';

export const validAutheticateInput: AuthenticateDto = {
    email: 'validlogin@gmail.com',
    password: 'TesteSenha@1452',
};

export const expectedAutheticateResult: AuthResult = {
    accessToken: '',
    email: '',
    id: '',
};

export const invalidAutheticateNotFound: AuthenticateDto = {
    email: 'nonexistentemail@gmail.com',
    password: 'TesteSenha@1452',
};

export const invalidAutheticateUnauthorized: AuthenticateDto = {
    email: 'validlogin@gmail.com',
    password: 'wrongPassword',
};
