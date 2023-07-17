import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JWT_KEY } from 'src/utils/constants';

dotenv.config();
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    let token =
      request.headers.authorization || request.headers['x-access-token'];
    token = token?.replace(/^Bearer\s+/, '');
    try {
      jwt.verify(
        token,
        JWT_KEY,
      );
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export default JwtAuthGuard;
