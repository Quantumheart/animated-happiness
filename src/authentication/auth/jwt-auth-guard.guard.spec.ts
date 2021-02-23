import { JwtAuthGuard } from './jwt-auth-guard.service';

describe('JwtAuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
