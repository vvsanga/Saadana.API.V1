
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { AppUserProfile } from './entities/app-user-profile.entity';
import { AppUser } from './entities/app-user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AppUser,
            AppUserProfile,
        ])
    ],
    exports: [
        UserRepository,
    ],
    providers: [
        UserRepository,
        UserService,
    ],
    controllers: [
        UserController,
    ]
})
export class UsersModule { }
