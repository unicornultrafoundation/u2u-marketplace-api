import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail } from 'class-validator';

export class SendVerifyEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}

export class VerifyEmailDto {
  @IsString()
  token: string;
}
