import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtSecretOrKey = () => ({ secret: 'SECRET' });

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtSecretOrKey().secret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
