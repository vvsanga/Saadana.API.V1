import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ example: true, description: 'Indicates if the request was successful' })
  success!: boolean;

  @ApiPropertyOptional({ example: 'Request processed successfully', description: 'A message about the result' })
  message?: string;

  @ApiPropertyOptional({ example: '300ms', description: 'Response duration' })
  durationMs!: number;

  @ApiPropertyOptional({ example: Date.now(), description: 'Response timestamp' })
  timestamp!: number;

  @ApiPropertyOptional({ description: 'Returned data of specific type' })
  data?: T;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
    this.timestamp = this.timestamp || Date.now();
    this.success = partial.success ?? true;
  }
}
