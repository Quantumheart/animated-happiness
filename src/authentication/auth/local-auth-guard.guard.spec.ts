import { LocalAuthGuard } from './local-auth-guard.service';

describe('LocalAuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
