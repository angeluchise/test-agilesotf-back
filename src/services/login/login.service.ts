import { Injectable } from '@nestjs/common';
import User from '../../models/user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(user: User): Promise<any> {
    const userFind = await this.userService.findRelationsByUsername(user.username);
    if (!userFind) {
      throw 'Usuario no existe';
    }

    const userSerialice = new User(user);
    if (userFind.password.localeCompare(userSerialice.password) !== 0) {
      throw 'Contraseña incorrecta';
    } else {
      delete userFind.password;
      return {
        token: this.jwtService.sign(userFind.getPlain(), {expiresIn: '12h'}),
        user: userFind.getPlain(),
      };
    }
  }
}
