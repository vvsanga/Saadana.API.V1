import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

// for only Swagger Decorators
export function ApiCrud<
    CreateDto extends Type<any>,
    UpdateDto extends Type<any>,
    ResponseDto extends Type<any>
>(
    createDto: CreateDto,
    updateDto: UpdateDto,
    responseDto: ResponseDto
) {
    return applyDecorators(
        // Responses
        ApiOkResponse({ type: responseDto, isArray: true }),
        ApiCreatedResponse({ type: responseDto }),

        // Request bodies
        ApiBody({ type: createDto, description: 'Create payload', required: true }),
        ApiBody({ type: updateDto, description: 'Update payload', required: false }),
    );
}
