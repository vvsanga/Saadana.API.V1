import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PublicRoute } from "src/core/decorators/auth.decorator";
import { SuccessResponseMsg } from "../../../core/decorators/response.decorator";
import { AcdContentRepoService } from "../../academic/repos/content.repo";

@PublicRoute()
@ApiTags('Academic Topic Content')
@Controller('academic/topic/content')
export class AcdTopicContentController {
  constructor(protected readonly repo: AcdContentRepoService) { }

  @Get(':topicUid')
  @SuccessResponseMsg('Records retrieved successfully')
  async getByTopic(@Param('topicUid') topicUid: string) {
    return await this.repo.getByTopic(topicUid);
  }
}
