import { CreateUserDto } from '@app/shared/dtos';

export function createMockUser(query: CreateUserDto) {
    return {
        id: '8588f5e8-dae1-4891-809e-798de4c1e099',
        email: query.email,
        linksCount: 0,
        name: query.name,
        createdAt: '2025-07-25T15:46:07.806Z',
        updatedAt: '2025-07-25T15:46:07.806Z',
    };
}
