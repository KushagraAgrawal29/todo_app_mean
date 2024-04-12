import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { LoginDto } from './login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.loginService.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // const token = await this.loginService.generateToken(user);
    // return { token };
    return user;
  }
}
