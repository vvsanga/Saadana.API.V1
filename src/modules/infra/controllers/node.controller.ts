import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseReadOnlyController } from '../../../core/base/controllers/base-read-only.controller';
import { ApiReadonly } from '../../../core/decorators/api-readonly.decorator';
import { PublicRoute } from '../../../core/decorators/auth.decorator';
import { NodeDto } from '../dtos/node.dto';
import { AppNode } from '../entities/app-node.entity';
import { NodeService } from '../services/node.service';

@PublicRoute()
@ApiTags('App Nodes')
@Controller('app/nodes')
@ApiReadonly(NodeDto)
export class NodeController extends BaseReadOnlyController<
  AppNode,
  NodeDto
> {
  constructor(protected readonly api: NodeService) {
    super(api, NodeDto);
  }
}
