// authenticated.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.session && request.session.userId) {
      return true;
    } else {
      throw new UnauthorizedException(
        'You must be logged in to access this resource.',
      );
    }
  }
}
