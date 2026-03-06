import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../../../core/base/services/base-crud.service';
import { ENodeMaster } from '../constants/app.enum';
import { AppNode } from '../entities/app-node.entity';

@Injectable()
export class NodeService extends BaseCrudService<AppNode> {
  constructor(@InjectRepository(AppNode) repo: Repository<AppNode>) {
    super(repo, { enumFields: { master: ENodeMaster } });
  }
}
