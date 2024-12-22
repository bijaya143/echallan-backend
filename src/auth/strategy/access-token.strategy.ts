import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Set to false in prod
      secretOrKey: process.env['ACCESS_TOKEN_SECRET'],
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
