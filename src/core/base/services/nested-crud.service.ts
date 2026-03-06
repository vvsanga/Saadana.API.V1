import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryParamsDto } from '../dtos/query-params.dto';
import { BaseCreateEntity } from '../entities/base-create.entity';
import { BaseCrudService, BaseCrudServiceOptions, IPaging } from './base-crud.service';

export abstract class NestedCrudService<
  T extends BaseCreateEntity,
  P extends BaseCreateEntity,
> extends BaseCrudService<T> {

  constructor(
    protected readonly repository: Repository<T>,
    private readonly parentRepo: Repository<P>,
    private readonly parentField: keyof T,
    options: BaseCrudServiceOptions<T> = {},
  ) {
    super(repository, options);
  }

  /* -------------------- Parent Resolver -------------------- */

  protected async resolveParentId(parentUid: string): Promise<number> {
    const parent = await this.parentRepo.findOne({
      where: {
        uid: parentUid,
        isActive: true,
      } as FindOptionsWhere<P>,
      select: ['id'],
    });

    if (!parent) {
      throw new BadRequestException(
        `Invalid parent UID: ${parentUid}`,
      );
    }

    return parent.id;
  }

  protected buildParentWhere(parentId: number): FindOptionsWhere<T> {
    return {
      [this.parentField]: { id: parentId },
    } as FindOptionsWhere<T>;
  }

  /* -------------------- Public Nested API -------------------- */

  async createUnderParent(
    parentUid: string,
    payload: DeepPartial<T>,
  ): Promise<T> {

    const parentId = await this.resolveParentId(parentUid);

    (payload as any)[this.parentField] = { id: parentId };

    return super.create(payload);
  }

  async getAllUnderParent(
    parentUid: string,
    query: QueryParamsDto,
  ): Promise<IPaging<T>> {

    const parentId = await this.resolveParentId(parentUid);

    const originalBuild = this.buildBaseWhere.bind(this);

    // Temporarily wrap base where builder
    this.buildBaseWhere = (q: QueryParamsDto) => ({
      ...originalBuild(q),
      ...this.buildParentWhere(parentId),
    });

    const result = await super.getAll(query);

    // restore original
    this.buildBaseWhere = originalBuild;

    return result;
  }

  async getByIdUnderParent(
    parentUid: string,
    uid: string,
  ): Promise<T> {

    const parentId = await this.resolveParentId(parentUid);

    const entity = await this.repository.findOne({
      where: {
        uid,
        isActive: true,
        ...this.buildParentWhere(parentId),
      } as FindOptionsWhere<T>,
      relations: this.selectRelations,
    });

    if (!entity) {
      throw new NotFoundException(
        `Record ${uid} not found under parent`,
      );
    }

    await this.ensureAuthorized('read', entity);

    return entity;
  }

  async updateUnderParent(
    parentUid: string,
    uid: string,
    payload: DeepPartial<T>,
  ): Promise<T> {

    await this.getByIdUnderParent(parentUid, uid);

    const parentId = await this.resolveParentId(parentUid);

    if ((payload as any)[this.parentField] === undefined) {
      (payload as any)[this.parentField] = { id: parentId };
    }

    return super.update(uid, payload);
  }

  async deleteUnderParent(
    parentUid: string,
    uid: string,
  ): Promise<void> {

    await this.getByIdUnderParent(parentUid, uid);
    return super.delete(uid);
  }
}
