import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppClient } from "../../security/entities/app-client.entity";

@Injectable()
export class ClientRepository {
    constructor(
        @InjectRepository(AppClient)
        private readonly clientRepo: Repository<AppClient>,
    ) { }

    async getActiveOrigins(): Promise<string[]> {
        const rows = await this.clientRepo.find({
            where: { isActive: true },
            select: ['origins'],
        });

        return rows
            .flatMap(r => r.origins?.split(',') ?? [])
            .map(o => o.trim())
            .filter(Boolean);
    }

    async getActiveIpRanges() {
        return this.clientRepo.find({
            where: { isActive: true },
            select: ['ipFrom', 'ipTo'],
        });
    }
}
