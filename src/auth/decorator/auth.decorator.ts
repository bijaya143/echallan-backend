import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard } from '../guard/access-token.guard';
import { RefreshTokenGuard } from '../guard/refresh-token.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export const AtGuard = () => applyDecorators(UseGuards(AccessTokenGuard));
export const RtGuard = () => applyDecorators(UseGuards(RefreshTokenGuard));
