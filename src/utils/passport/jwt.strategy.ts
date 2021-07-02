import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey123456',
    });
  }

  async validate(jwtPayload: any) {
    const user = await this.userService.findRelationsByUsername(jwtPayload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}