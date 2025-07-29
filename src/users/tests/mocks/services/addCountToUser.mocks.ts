import { UserErrorMessages } from '@app/shared';
import { AddCountLinkDto } from '@app/shared/dtos';

export const invalidAddCounLink: AddCountLinkDto = {
    id: 'nonExistentId',
};

export const expectedInvalidAddCounLink = UserErrorMessages.UserNotFound;

export const validAddCountLink: AddCountLinkDto = {
    id: '6887052dfc13ae2105a0544b',
};

export const expectedAddCountLink: boolean = true;
