import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    create() {}

    findAll() {}

    findOne(id: number) {}

    update(id: number) {}

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
