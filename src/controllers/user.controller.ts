import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }
}
