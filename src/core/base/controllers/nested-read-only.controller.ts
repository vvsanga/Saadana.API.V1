import { Get, Param, Query } from "@nestjs/common";
import { QueryParamsDto } from "../dtos/query-params.dto";
import { BaseCreateEntity } from "../entities/base-create.entity";
import { IBaseCrudService, IPaging } from "../services/base-crud.service";

export abstract class NestedReadOnlyCrudController<
    TEntity extends BaseCreateEntity,
    ResponseDto
> {
    constructor(
        protected readonly nestedCrudService: IBaseCrudService<TEntity>,
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

    protected async prepareParent(parentUid: string) {
        await (this.nestedCrudService as any).setParentUid(parentUid);
    }

    @Get()
    async getAll(
        @Param('parentUid') parentUid: string,
        @Query() query: QueryParamsDto = {},
    ) {
        await this.prepareParent(parentUid);

        const result =
            await this.nestedCrudService.getAll(query);

        return this.toResponsePaging(result);
    }

    @Get(':uid')
    async getOne(
        @Param('parentUid') parentUid: string,
        @Param('uid') uid: string,
    ) {
        await this.prepareParent(parentUid);

        const result =
            await this.nestedCrudService.getById(uid);

        return this.toResponse(result);
    }
}
