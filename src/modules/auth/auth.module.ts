import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ActivityService } from '../nft/activity.service';
import { GraphQlcallerService } from '../graph-qlcaller/graph-qlcaller.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '1d',
        },
        secret: process.env.JWT_SECRET,
      }),
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    GraphQlcallerService,
    ActivityService,
    PrismaService,
    JwtStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
