import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EAcdContentType } from "../constants/syllabus.enum";
import { TopicContentDto } from "../dtos/topic-content.dto";
import { AcdContent } from "../entities/content.entity";

@Injectable()
export class AcdContentRepoService {
    constructor(
        @InjectRepository(AcdContent)
        private readonly contentRepository: Repository<AcdContent>,
    ) { }

    async getByTopic(topicUid: string): Promise<TopicContentDto> {

        const rows = await this.contentRepository
            .createQueryBuilder('content')
            .innerJoin('content.topic', 'syllabus')
            .leftJoinAndSelect('content.diagrams', 'contentDiagram')
            .leftJoinAndSelect('contentDiagram.diagram', 'diagram')
            .leftJoinAndSelect('content.comparisons', 'contentComparison')
            .leftJoinAndSelect('contentComparison.comparison', 'comparison')
            .where('syllabus.uid = :topicUid', { topicUid })
            .orderBy('content.order', 'ASC')
            .addOrderBy('contentDiagram.order', 'ASC')
            .addOrderBy('contentComparison.order', 'ASC')
            .getMany();

        const result: TopicContentDto = {
            definitions: [],
            keyPoints: [],
            formulas: [],
            classifications: [],
            examples: [],
            remembers: [],
            diagrams: [],
            comparisons: []
        };

        for (const c of rows) {

            const contentItem = {
                uid: c.uid,
                order: c.order,
                type: c.type,
                title: c.title,
                content: c.content
            };

            /* -----------------------------
               GROUP BY TYPE
            ------------------------------*/

            switch (c.type) {
                case EAcdContentType.DEFINITION:
                    result.definitions?.push(contentItem);
                    break;

                case EAcdContentType.KEY_POINT:
                    result.keyPoints?.push(contentItem);
                    break;

                case EAcdContentType.FORMULA:
                    result.formulas?.push(contentItem);
                    break;

                case EAcdContentType.CLASSIFICATION:
                    result.classifications?.push(contentItem);
                    break;

                case EAcdContentType.EXAMPLE:
                    result.examples?.push(contentItem);
                    break;

                case EAcdContentType.REMEMBER:
                    result.remembers?.push(contentItem);
                    break;
            }

            /* -----------------------------
               DIAGRAMS (NO GROUPING)
            ------------------------------*/

            if (c.diagrams?.length) {
                for (const d of c.diagrams) {
                    result.diagrams?.push({
                        uid: d.uid,
                        order: d.order,
                        diagram: {
                            uid: d.diagram.uid,
                            media: d.diagram.media,
                            title: d.diagram.title,
                            url: d.diagram.url
                        }
                    });
                }
            }

            /* -----------------------------
               COMPARISONS (NO GROUPING)
            ------------------------------*/

            // if (c.comparisons?.length) {
            //     for (const comp of c.comparisons) {
            //         result.comparisons.push({
            //             uid: comp.uid,
            //             order: comp.order,
            //             comparison: {
            //                 uid: comp.comparison.uid,
            //                 title: comp.comparison.title
            //             }
            //         });
            //     }
            // }
        }

        return result;
    }
}
