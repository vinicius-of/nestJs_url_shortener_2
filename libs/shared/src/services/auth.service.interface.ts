import { AuthResult } from '../contracts/auth.contract';
import { AuthenticateDto, CreateLoginDto } from '../dtos/auth.dto.interface';

export interface IAuthService {
    autheticate(data: AuthenticateDto): Promise<AuthResult>;
    createLogin(data: CreateLoginDto): Promise<void>;
}
