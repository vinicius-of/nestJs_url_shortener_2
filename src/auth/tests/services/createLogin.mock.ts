import { CreateLoginDto } from '@app/shared/dtos/auth.dto.interface';

export const validCreateLoginInput: CreateLoginDto = {
    email: 'vinicius@gmail.com',
    password: 'TesteSenha@1452',
    name: 'Vinicius',
};

export const invalidCreateLoginBadRequest: CreateLoginDto = {
    email: 'sglaister1@yelp.com',
    password: 'TesteSenha@1452',
    name: 'Laister',
};
