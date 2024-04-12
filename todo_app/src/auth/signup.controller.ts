import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service'; // Import the UserService for user operations

class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

@Controller('auth')
export class SignupController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    
    try {
      const newUser = await this.userService.createUser(createUserDto); // Call the UserService to create a new user
      return { message: 'User created successfully', user: newUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
