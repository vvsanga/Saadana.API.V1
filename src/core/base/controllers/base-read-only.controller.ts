import { Get, Param, Query } from "@nestjs/common";
import { QueryParamsDto } from "../dtos/query-params.dto";
import { BaseCreateEntity } from "../entities/base-create.entity";
import { IBaseCrudService, IPaging } from "../services/base-crud.service";

export abstract class BaseReadOnlyController<
    TEntity extends BaseCreateEntity,
    ResponseDto
> {
    constructor(
        protected readonly baseCrudService: IBaseCrudService<TEntity>,
        protected readonly responseDto: new (entity: TEntity) => ResponseDto,
    ) { }

    protected toResponse(entity: TEntity): ResponseDto {
        return new this.responseDto(entity);
    }

    protected toResponsePaging(
        result: IPaging<TEntity>,
    ): IPaging<ResponseDto> {
        return {
            ...result,
            items: result.items.map(
                (e) => new this.responseDto(e),
            ),
        };
    }

    @Get()
    async getAll(@Query() query: QueryParamsDto = {}) {
        const result =
            await this.baseCrudService.getAll(query);

        return this.toResponsePaging(result);
    }

    @Get(':uid')
    async getOne(@Param('uid') uid: string) {
        const result =
            await this.baseCrudService.getById(uid);

        return this.toResponse(result);
    }
}
