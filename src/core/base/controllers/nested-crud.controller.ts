import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { QueryParamsDto } from "../dtos/query-params.dto";
import { BaseCreateEntity } from "../entities/base-create.entity";
import { IPaging } from "../services/base-crud.service";
import { NestedCrudService } from "../services/nested-crud.service";

export abstract class NestedCrudController<
  TEntity extends BaseCreateEntity,
  TParent extends BaseCreateEntity,
  ResponseDto,
  CreateDto,
  UpdateDto,
> {
  constructor(
    protected readonly service: NestedCrudService<TEntity, TParent>,
    protected readonly responseDto: new (entity: TEntity) => ResponseDto
  ) { }

  protected toResponse(entity: TEntity): ResponseDto {
    return new this.responseDto(entity);
  }

  protected toResponsePaging(
    result: IPaging<TEntity>,
  ): IPaging<ResponseDto> {
    return {
      ...result,
      items: result.items.map(e => new this.responseDto(e)),
    };
  }

  @Post()
  async create(
    @Param('parentUid') parentUid: string,
    @Body() dto: CreateDto,
  ) {
    const result = await this.service.createUnderParent(
      parentUid,
      dto as any,
    );
    return this.toResponse(result);
  }

  @Get()
  async getAll(
    @Param('parentUid') parentUid: string,
    @Query() query: QueryParamsDto = {},
  ) {
    const result = await this.service.getAllUnderParent(
      parentUid,
      query,
    );
    return this.toResponsePaging(result);
  }

  @Get(':uid')
  async getOne(
    @Param('parentUid') parentUid: string,
    @Param('uid') uid: string,
  ) {
    const result = await this.service.getByIdUnderParent(
      parentUid,
      uid,
    );
    return this.toResponse(result);
  }

  @Patch(':uid')
  async update(
    @Param('parentUid') parentUid: string,
    @Param('uid') uid: string,
    @Body() dto: UpdateDto,
  ) {
    const result = await this.service.updateUnderParent(
      parentUid,
      uid,
      dto as any,
    );
    return this.toResponse(result);
  }

  @Delete(':uid')
  async delete(
    @Param('parentUid') parentUid: string,
    @Param('uid') uid: string,
  ) {
    return this.service.deleteUnderParent(parentUid, uid);
  }
}
