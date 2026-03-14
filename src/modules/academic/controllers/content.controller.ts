import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NestedCrudController } from "../../../core/base/controllers/nested-crud.controller";
import { ApiCrud } from "../../../core/decorators/api-crud.decorator";
import { AcdContentCreateDto, AcdContentDto, AcdContentUpdateDto } from "../dtos/content.dto";
import { AcdContent } from "../entities/content.entity";
import { AcdSyllabus } from "../entities/syllabus.entity";
import { AcdContentService } from "../services/content.service";

@ApiTags('Academic Content')
@Controller('academic/content/topic/:parentUid')
@ApiCrud(AcdContentCreateDto, AcdContentUpdateDto, AcdContentDto)
export class AcdContentController extends NestedCrudController<
  AcdContent,
  AcdSyllabus,
  AcdContentDto,
  AcdContentCreateDto,
  AcdContentUpdateDto
> {
  constructor(protected readonly service: AcdContentService) {
    super(service, AcdContentDto);
  }
}
