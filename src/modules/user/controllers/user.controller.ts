import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseCrudController } from '../../../core/base/controllers/base-crud.controller';
import { ApiCrud } from '../../../core/decorators/api-crud.decorator';
import { SuccessResponseMsg } from '../../../core/decorators/response.decorator';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dtos/user.dto';
import { AppUser } from '../entities/app-user.entity';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@Controller('users')
@ApiCrud(UserCreateDto, UserUpdateDto, UserDto)
export class UserController extends BaseCrudController<
  AppUser,
  UserCreateDto,
  UserUpdateDto,
  UserDto
> {
  constructor(protected readonly api: UserService) {
    super(api, UserDto);
  }

  @Get('email/:email')
  @SuccessResponseMsg('Records retrieved successfully')
  async getByEmail(@Param('email') email: string) {
    return await this.api.getByEmail(email);
  }

  @Get('phone/:phone')
  @SuccessResponseMsg('Records retrieved successfully')
  async getByPhone(@Param('phone') phone: string) {
    return await this.api.getByPhone(phone);
  }
}
