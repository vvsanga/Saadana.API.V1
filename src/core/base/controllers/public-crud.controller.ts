import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryParamsDto } from '../dtos/query-params.dto';
import { BaseCreateEntity } from '../entities/base-create.entity';
import { IBaseCrudService, IPaging } from '../services/base-crud.service';

export abstract class PublicCrudController<
  TEntity extends BaseCreateEntity,
  CreateDto,
  UpdateDto,
  ResponseDto
> {
  constructor(
    protected readonly publicCrudService: IBaseCrudService<TEntity>,
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

  @Post()
  async create(@Body() dto: CreateDto) {
    const result =
      await this.publicCrudService.create(dto as any);

    return this.toResponse(result);
  }

  @Get()
  async getAll(@Query() query: QueryParamsDto = {}) {
    const result =
      await this.publicCrudService.getAll(query);

    return this.toResponsePaging(result);
  }

  @Get(':uid')
  async getOne(@Param('uid') uid: string) {
    const result =
      await this.publicCrudService.getById(uid);

    return this.toResponse(result);
  }

  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() dto: UpdateDto,
  ) {
    const result =
      await this.publicCrudService.update(uid, dto as any);

    return this.toResponse(result);
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string) {
    return this.publicCrudService.delete(uid);
  }
}
