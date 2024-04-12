import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {

    const { password,...otherUserData } = userData
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds (second parameter) as needed

    // Create a new user object with the hashed password
    const newUser = this.userRepository.create({ ...otherUserData, password: hashedPassword });

    // Save the new user to the database
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: { email }});
  }

  // Example method to compare passwords
  async comparePassword(attempt: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(attempt, hashedPassword);
  }
}
