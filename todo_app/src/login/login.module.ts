import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET,
      }),    
    TypeOrmModule.forFeature([User])
],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
