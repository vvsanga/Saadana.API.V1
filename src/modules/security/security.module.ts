import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { ClientController } from './controllers/client.controller';
import { AppClient } from './entities/app-client.entity';
import { AuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { ClientRepository } from './repositories/client.repository';
import { ClientService } from './services/client.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AppClient]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: process.env.JWT_ACCESS_SECRET || config.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: Number(process.env.JWT_ACCESS_TTL_MINS || config.get<string>('JWT_ACCESS_TTL_MINS')) * 60, // minutes to seconds
          },
        };
      },
    }),
    UsersModule,
  ],
  providers: [
    ClientRepository,
    ClientService,
    RolesGuard,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  controllers: [ClientController],
  exports: [JwtModule],
})
export class SecurityModule { }
