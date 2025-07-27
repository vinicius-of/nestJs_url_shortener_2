import { JwtGuardGuard } from './jwtGuard.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuardGuard()).toBeDefined();
  });
});
