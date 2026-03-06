import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicRoute, RefreshRoute } from '../../../core/decorators/auth.decorator';
import { SuccessResponseMsg } from '../../../core/decorators/response.decorator';
import {
  LoginOAuthRequestDto,
  LoginOtpIssueRequestDto,
  LoginOtpValidateRequestDto,
  LoginPasswordRequestDto,
  LoginResponseDto,
  RefreshResponseDto,
  RegisterRequestDto,
  RegisterResponseDto
} from '../dtos/auth-access.dto';
import { AuthAccessService } from '../services/auth-access.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthAccessController {
  constructor(private readonly authAccessSvc: AuthAccessService) { }

  @PublicRoute()
  @Post('register')
  @SuccessResponseMsg('Register successful')
  @ApiOperation({ summary: 'User registration successful' })
  @ApiOkResponse({ type: RegisterResponseDto })
  async register(@Body() payload: RegisterRequestDto) {
    return this.authAccessSvc.register(payload);
  }

  @PublicRoute()
  @Post('login')
  @SuccessResponseMsg('Login successful')
  @ApiOperation({ summary: 'Authenticate user and get access & refresh tokens' })
  @ApiOkResponse({ type: LoginResponseDto })
  async loginWithPassword(@Body() payload: LoginPasswordRequestDto) { //: Promise<LoginResponseDto> {
    return this.authAccessSvc.loginWithPassword(payload);
  }

  @PublicRoute()
  @Post('login/issue-otp') //login/otp/request
  @SuccessResponseMsg('Login successful')
  @ApiOperation({ summary: 'Authenticate user and get access & refresh tokens' })
  @ApiOkResponse({ type: LoginResponseDto })
  async loginWithOtpIssue(@Body() payload: LoginOtpIssueRequestDto) { //: Promise<LoginResponseDto> {    
    return this.authAccessSvc.loginIssueOtp(payload);
  }

  @PublicRoute()
  @Post('login/otp')
  @SuccessResponseMsg('Login successful')
  @ApiOperation({ summary: 'Authenticate user and get access & refresh tokens' })
  @ApiOkResponse({ type: LoginResponseDto })
  async loginWithOtp(@Body() payload: LoginOtpValidateRequestDto) { //: Promise<LoginResponseDto> {
    return this.authAccessSvc.loginWithOtp(payload);
  }

  @PublicRoute()
  @Post('login/provider/:provider')
  @SuccessResponseMsg('Login successful')
  @ApiOperation({ summary: 'Authenticate user by provider' })
  @ApiOkResponse({ type: LoginResponseDto })
  async loginOAuth(@Body() payload: LoginOAuthRequestDto, @Param('provider') provider: string) { //: Promise<LoginResponseDto> {
    return this.authAccessSvc.loginOAuth(payload, provider);
  }

  @RefreshRoute()
  @Post('refresh')
  @SuccessResponseMsg('Token refreshed successfully')
  @ApiOperation({ summary: 'Refresh login session using a valid refresh token' })
  @ApiOkResponse({ type: RefreshResponseDto })
  async refresh() {
    return this.authAccessSvc.refresh();
  }

  @Post('logout')
  @SuccessResponseMsg('Logout successful')
  @ApiOperation({ summary: 'Logout user from current device/session' })
  async logout() {
    return this.authAccessSvc.logout();
  }

  @Post('logout/all')
  @SuccessResponseMsg('Logged out from all devices successfully')
  @ApiOperation({ summary: 'Logout user from all devices/sessions' })
  async logoutAll() {
    return this.authAccessSvc.logoutAll();
  }
}

