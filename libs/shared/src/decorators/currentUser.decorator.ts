import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../contracts/jwtPayload.contract';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
});
