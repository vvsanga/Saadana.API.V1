import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcdContentController } from "./controllers/content.controller";
import { AcdDiagramController } from "./controllers/diagram.controller";
import { AcdSyllabusController } from "./controllers/syllabus.controller";
import { AcdTopicContentController } from "./controllers/topic-content.controller";
import { AcdComparisonItem } from "./entities/comparison-item.entity";
import { AcdComparison } from "./entities/comparison.entity";
import { AcdContentComparison } from "./entities/content-comparison.entity";
import { AcdContentDiagram } from "./entities/content-diagram.entity";
import { AcdContent } from "./entities/content.entity";
import { AcdDiagram } from "./entities/diagram.entity";
import { AcdSyllabus } from "./entities/syllabus.entity";
import { AcdContentRepoService } from "./repos/content.repo";
import { AcdContentService } from "./services/content.service";
import { AcdDiagramService } from "./services/diagram.service";
import { AcdSyllabusService } from "./services/syllabus.service";

@Module({
  imports: [TypeOrmModule.forFeature([
    AcdSyllabus,
    AcdContent,
    AcdComparison,
    AcdComparisonItem,
    AcdContentComparison,
    AcdDiagram,
    AcdContentDiagram,
  ])
  ],
  providers: [
    AcdContentRepoService,
    AcdSyllabusService,
    AcdDiagramService,
    AcdContentService
  ],
  controllers: [
    AcdSyllabusController,
    AcdDiagramController,
    AcdContentController,
    AcdTopicContentController
  ]
})
export class AcademicsModule { }
