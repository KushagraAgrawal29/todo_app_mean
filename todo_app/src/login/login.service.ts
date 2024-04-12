import { Injectable } from '@nestjs/common';
import { UserService } from '../auth/user.service'; // Assuming you have a UserService for user-related operations
import { JwtService } from '@nestjs/jwt'; // Assuming you are using JWT for authentication
import { User } from '../auth/user.entity'; // Assuming you have a User entity

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.userService.comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
