import { Controller, Post, Body, UseInterceptors, Param, UseFilters } from '@nestjs/common';
import User from '../models/user/user.entity';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly loginService: LoginService,
    ) { }

    @Post('login')
    async login(@Body() user: User): Promise<any> {
        return this.loginService.execute(user);
    }

    @Post('register')
    async register(@Body() user: User): Promise<User> {
        return this.userService.register(user);
    }

}
