import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const jwtSecret = configService.get<string>('jwt.secret');
    if (!jwtSecret)
        throw new Error('JWT_SECRET is undefined');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refreshToken
      ]),
      secretOrKey: jwtSecret,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user || user.refreshToken !== req.cookies?.refreshToken) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
