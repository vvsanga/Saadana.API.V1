import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CompareHashAsync } from '../../../core/utils/crypto.util';
import { EChannel, EOtpType } from '../constants/auth.enum';
import { AuthOtp } from '../entities/auth-otp.entity';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(AuthOtp)
    private readonly repo: Repository<AuthOtp>,
  ) { }

  async create(userId: number, channel: EChannel, type: EOtpType) {
    await this.revoke(userId, channel, type);

    return this.repo.save(
      this.repo.create({ user: { id: userId }, channel, type }),
    );
  }

  async verify(userId: number, channel: EChannel, type: EOtpType, otp: string) {
    const record = await this.repo.findOne({
      where: {
        user: { id: userId },
        channel,
        type,
        isRevoked: false,
        expiresAt: MoreThan(new Date()),
      },
      order: { createdAt: 'DESC' },
    });

    if (!record || !(await CompareHashAsync(otp, record.otp))) {
      throw new BadRequestException('Invalid OTP');
    }

    record.isRevoked = true;
    await this.repo.save(record);
    return true;
  }

  async revoke(userId: number, channel: EChannel, type: EOtpType) {
    await this.repo.update(
      { user: { id: userId }, channel, type, isRevoked: false },
      { isRevoked: true },
    );
  }
}
