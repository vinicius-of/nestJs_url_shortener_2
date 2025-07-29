export interface Auth {
    email: string;
    password: string;
}

export interface AuthResult {
    accessToken: string;
    id: string;
    email: string;
}
