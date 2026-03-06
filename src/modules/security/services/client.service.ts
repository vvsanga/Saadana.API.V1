import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseCrudService } from "../../../core/base/services/base-crud.service";
import { AppClient } from "../entities/app-client.entity";

@Injectable()
export class ClientService extends BaseCrudService<AppClient> {
    constructor(
        @InjectRepository(AppClient) repo: Repository<AppClient>,
    ) {
        super(repo);
    }
}