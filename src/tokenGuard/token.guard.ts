import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import { jwtAuthConfig } from '@app/config/configurations/jwt';
import { JwtPayload } from '@app/shared/contracts/jwtPayload.contract';

type RequestWithUser = Request & {
    user: unknown;
};

@Injectable()
export class HasToken implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtAuthConfig.KEY) private readonly jwtConfigs: ConfigType<typeof jwtAuthConfig>,
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            return true;
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token, {
                secret: this.jwtConfigs.secret,
            });

            request.user = {
                loginId: tokenPayload.sub,
                userId: tokenPayload.userId,
                email: tokenPayload.email,
            };

            return true;
        } catch (error: unknown) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
