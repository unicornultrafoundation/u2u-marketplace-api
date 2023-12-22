import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // If there's an error (including expired token), throw UnauthorizedException
    if (err || (info && info.name === 'TokenExpiredError')) {
      throw new UnauthorizedException();
    }
    // If user exists and emailVerify is not true, throw UnauthorizedException
    if (user && user.accountStatus !== true) {
      throw new UnauthorizedException('Your email needs verification');
    }
    return user;
  }
}
