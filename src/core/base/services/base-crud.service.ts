import { BadRequestException, ForbiddenException, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DeepPartial, FindManyOptions, FindOptionsOrder, FindOptionsWhere, ILike, Repository } from "typeorm";
import { RequestContext } from "../../models/request-context.model";
import { OwnershipService } from "../../services/ownership.service";
import { EnumUtil } from "../../utils/enum.util";
import { QueryParamsDto } from "../dtos/query-params.dto";
import { BaseCreateEntity } from "../entities/base-create.entity";

export type TAction = 'create' | 'read' | 'update' | 'delete';

export interface IPaging<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    pages: number;
}

export interface IBaseCrudService<TEntity extends BaseCreateEntity> {
    create(data: DeepPartial<TEntity>): Promise<TEntity>;
    createAll(data: DeepPartial<TEntity>[]): Promise<TEntity[]>;
    getAll(query: QueryParamsDto): Promise<IPaging<TEntity>>;
    getById(uid: string): Promise<TEntity>;
    update(uid: string, data: DeepPartial<TEntity>): Promise<TEntity>;
    delete(uid: string): Promise<void>;
    deactivate(uid: string): Promise<TEntity>;
    activate(uid: string): Promise<TEntity>;
}

export type BaseCrudServiceOptions<T> = Partial<{
    allowSortFields: (keyof T)[];
    allowSearchFields: (keyof T)[];
    selectRelations: string[];
    saveRelations: { key: string; repo: any; uid: string }[];
    enumFields: Partial<Record<keyof T, Record<string, string | number>>>;
}>;

export abstract class BaseCrudService<T extends BaseCreateEntity> implements IBaseCrudService<T> {

    @Inject(OwnershipService)
    protected readonly owner!: OwnershipService;

    protected readonly allowSortFields: (keyof T)[];
    protected readonly allowSearchFields: (keyof T)[];
    protected readonly selectRelations: string[];
    protected readonly saveRelations: { key: string; repo: any; uid: string }[];
    protected readonly enumFields: Partial<Record<keyof T, Record<string, string | number>>>;

    constructor(
        protected readonly repository: Repository<T>,
        options: BaseCrudServiceOptions<T> = {}
    ) {
        this.allowSortFields = options.allowSortFields ?? [];
        this.allowSearchFields = options.allowSearchFields ?? [];
        this.selectRelations = options.selectRelations ?? [];
        this.saveRelations = options.saveRelations ?? [];
        this.enumFields = options.enumFields ?? {};
    }

    protected getCurrentUser() {
        return RequestContext.user ?? null;
    }

    protected async ensureAuthorized(
        action: TAction,
        entity?: T,
    ) {
        const user = this.getCurrentUser();

        if (!user) {
            throw new UnauthorizedException();
        }

        const allowed = await this.owner.can(
            action,
            user,
            entity ? { createdBy: entity.createdBy } : undefined,
        );

        if (!allowed) {
            throw new ForbiddenException('Access denied');
        }
    }


    protected buildBaseWhere(query: QueryParamsDto): FindOptionsWhere<T> {
        return { isActive: query.isActive ?? true } as any;
    }

    private async resolveRelations(
        dto: DeepPartial<T> & object
    ): Promise<DeepPartial<T> & object> {

        if (!this.saveRelations.length) return dto;

        const result: Record<string, any> = { ...dto };

        for (const relation of this.saveRelations) {
            const uid = (dto as any)[relation.uid];
            if (!uid) continue;

            const relatedRepo =
                this.repository.manager.getRepository(relation.repo);

            const related = await relatedRepo.findOne({ where: { uid } });

            if (!related) {
                throw new BadRequestException(
                    `Invalid UID for relation: ${relation.key}`,
                );
            }

            result[relation.key] = { id: related.id };
            delete result[relation.uid];
        }

        return result as DeepPartial<T> & object;
    }

    private normalizeEnums(
        dto: DeepPartial<T> & object
    ): DeepPartial<T> & object {

        if (!this.enumFields) return dto;

        const result: Record<string, any> = { ...dto };

        for (const [field, enumObj] of Object.entries(this.enumFields)) {
            if (result[field] === undefined || result[field] === null) continue;

            if (!EnumUtil.exists(enumObj as any, result[field])) {
                throw new BadRequestException(
                    `Invalid value for enum field "${field}"`,
                );
            }

            result[field] =
                EnumUtil.getValue(enumObj as any, result[field]);
        }

        return result as DeepPartial<T> & object;
    }

    private parseSort(sort: string): FindOptionsOrder<T> {
        const order = {} as FindOptionsOrder<T>;

        for (const part of sort.split(',')) {
            const [field, dir = 'asc'] = part.split(':');

            if (!this.allowSortFields.includes(field as keyof T)) {
                throw new BadRequestException(`Invalid sort field: ${field}`);
            }

            (order as any)[field] =
                dir?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        }

        return order;
    }

    async create(dto: DeepPartial<T> & object): Promise<T> {
        const user = this.getCurrentUser();

        dto.createdBy = user?.id;

        await this.ensureAuthorized('create');

        const resolved = await this.resolveRelations(dto);
        const normalized = this.normalizeEnums(resolved);

        const entity = this.repository.create(normalized);
        return await this.repository.save(entity);
    }

    async createAll(
        dtos: (DeepPartial<T> & object)[]
    ): Promise<T[]> {

        const user = this.getCurrentUser();

        await this.ensureAuthorized('create');

        const processed: (DeepPartial<T> & object)[] = [];

        for (const dto of dtos) {
            dto.createdBy = user?.id;

            const resolved = await this.resolveRelations(dto);
            const normalized = this.normalizeEnums(resolved);
            processed.push(normalized);
        }

        const entities = this.repository.create(processed);
        return await this.repository.save(entities);
    }

    async getAll(
        query: QueryParamsDto,
        relations: string[] = []
    ): Promise<IPaging<T>> {

        const user = this.getCurrentUser();

        const {
            page = 1,
            pageSize = 10,
            sort,
            searchText,
            searchField,
            searchExact = false,
            noPaging = false,
        } = query;

        const where = this.buildBaseWhere(query);

        if (!user?.isInternal) {
            (where as any).createdBy = user?.id;
        }

        if (searchField && searchText) {
            if (!this.allowSearchFields.includes(searchField as keyof T)) {
                throw new BadRequestException(
                    `Invalid searchField: ${searchField}`,
                );
            }

            (where as any)[searchField] = searchExact
                ? searchText
                : ILike(`%${searchText}%`);
        }

        const combinedRelations = [
            ...new Set([...this.selectRelations, ...relations]),
        ];

        const options: FindManyOptions<T> = {
            where,
            relations: combinedRelations,
        };

        if (!noPaging) {
            options.skip = (page - 1) * pageSize;
            options.take = pageSize;
        }

        if (sort) {
            options.order = this.parseSort(sort);
        }

        const [items, total] =
            await this.repository.findAndCount(options);

        return {
            items,
            total,
            page: noPaging ? 1 : page,
            pageSize: noPaging ? total : pageSize,
            pages: noPaging ? 1 : Math.ceil(total / pageSize),
        };
    }

    async getById(uid: string): Promise<T> {

        const entity = await this.repository.findOne({
            where: { uid, isActive: true } as FindOptionsWhere<T>,
            relations: this.selectRelations,
        });

        if (!entity) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        await this.ensureAuthorized('read', entity);

        return entity;
    }

    async update(
        uid: string,
        data: DeepPartial<T> & object
    ): Promise<T> {

        if (data.uid && data.uid !== uid) {
            throw new BadRequestException(
                `Payload UID does not match URL UID`,
            );
        }

        const entity = await this.repository.findOne({
            where: { uid } as FindOptionsWhere<T>,
        });

        if (!entity) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        await this.ensureAuthorized('update', entity);

        const resolved = await this.resolveRelations(data);
        const normalized = this.normalizeEnums(resolved);

        const merged = await this.repository.preload({
            id: entity.id,
            ...normalized,
        });

        if (!merged) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        return await this.repository.save(merged);
    }

    async delete(uid: string): Promise<void> {

        const entity = await this.repository.findOne({
            where: { uid } as FindOptionsWhere<T>,
        });

        if (!entity) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        await this.ensureAuthorized('delete', entity);

        await this.repository.delete({
            uid,
        } as FindOptionsWhere<T>);
    }

    async deactivate(uid: string): Promise<T> {

        const entity = await this.repository.findOne({
            where: { uid } as FindOptionsWhere<T>,
        });

        if (!entity) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        await this.ensureAuthorized('update', entity);

        if (!entity.isActive) {
            throw new BadRequestException(
                `Record already inactive`,
            );
        }

        entity.isActive = false;

        return await this.repository.save(entity);
    }

    async activate(uid: string): Promise<T> {

        const entity = await this.repository.findOne({
            where: { uid } as FindOptionsWhere<T>,
        });

        if (!entity) {
            throw new NotFoundException(
                `Record with UID ${uid} not found`,
            );
        }

        await this.ensureAuthorized('update', entity);

        if (entity.isActive) {
            throw new BadRequestException(
                `Record already active`,
            );
        }

        entity.isActive = true;

        return await this.repository.save(entity);
    }
}
