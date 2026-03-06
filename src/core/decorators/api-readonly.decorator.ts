import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

export function ApiReadonly<ResponseDto extends Type<any>
>(responseDto: ResponseDto) {
    return applyDecorators(
        ApiOkResponse({ type: responseDto, isArray: true }),
        ApiCreatedResponse({ type: responseDto }),
    );
}
