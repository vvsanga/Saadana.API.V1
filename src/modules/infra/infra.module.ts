import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcdSyllabus } from '../academic/entities/syllabus.entity';
import { OrdersModule } from '../orders/orders.module';
import { HealthController } from './controllers/health.controller';
import { NodeController } from './controllers/node.controller';
import { PlanController } from './controllers/plan.controller';
import { SyllabusController } from './controllers/syllabus.controller';
import { AppNode } from './entities/app-node.entity';
import { AppPlan } from './entities/app-plan.entity';
import { NodeService } from './services/node.service';
import { PlanService } from './services/plan.service';
import { SyllabusService } from './services/syllabus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppNode,
      AppPlan,
      AcdSyllabus
    ]),
    TerminusModule,
    OrdersModule
  ],
  providers: [NodeService, PlanService, SyllabusService],
  controllers: [HealthController, NodeController, PlanController, SyllabusController],
})
export class InfraModule { }