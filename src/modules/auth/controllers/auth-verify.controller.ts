import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponseMsg } from '../../../core/decorators/response.decorator';
import { OtpIssueRequestDto, OtpValidateRequestDto } from '../dtos/auth-verify.dto';
import { OtpService } from '../services/otp.service';

@ApiTags('Auth Verification')
@Controller('auth/verify/:channel')
export class AuthVerifyController {
    constructor(private readonly otpSvc: OtpService) { }

    @Post('issue-otp')
    @ApiOperation({ summary: 'Issue OTP for email verification' })
    @SuccessResponseMsg('OTP sent to your registered email successfully')
    issueOtp(@Body() payload: OtpIssueRequestDto) {
        return this.otpSvc.issue({ ...payload, type: 'verify' });
    }

    @Post('otp')
    @ApiOperation({ summary: 'Validate email OTP' })
    @SuccessResponseMsg('Email verified successfully')
    validateOtp(@Body() payload: OtpValidateRequestDto) {
        return this.otpSvc.validate({ ...payload, type: 'verify' });
    }
}
