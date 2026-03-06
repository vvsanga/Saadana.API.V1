import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InternalRoute } from "../../../core/decorators/auth.decorator";
import { SuccessResponseMsg } from "../../../core/decorators/response.decorator";
import { AcdContentRepoService } from "../repos/content.repo";

@InternalRoute()
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
