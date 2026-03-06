import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { RelationDto } from '../dtos/family-relation.dto';
import { C_QUEST_TEMPLATES, C_RELATIONS, EDifficultyLevel, TGender } from '../models/family-relation.model';

@Injectable()
export class FamilyRelationService {

    private canonicalizeChain(chain: string[]): { relation: string; gender?: TGender } | null {
        if (chain.length === 1) return { relation: chain[0], gender: C_RELATIONS[chain[0]]?.gender };
        const [a, b, c] = chain;
        const ka = C_RELATIONS[a]?.kind;
        const kb = C_RELATIONS[b]?.kind;
        const gb = C_RELATIONS[b]?.gender;

        if (ka === 'parent' && kb === 'parent') return { relation: gb === 'male' ? 'grand-father' : 'grand-mother', gender: gb };
        if (ka === 'child' && kb === 'child') return { relation: gb === 'male' ? 'grand-son' : 'grand-daughter', gender: gb };
        if (ka === 'parent' && kb === 'sibling') return { relation: gb === 'male' ? 'uncle' : 'aunt', gender: gb };
        if (ka === 'sibling' && kb === 'child') return { relation: gb === 'male' ? 'nephew' : 'niece', gender: gb };
        if (ka === 'parent' && kb === 'sibling' && C_RELATIONS[c]?.kind === 'child') return { relation: 'cousin', gender: 'unknown' };

        if (ka === 'spouse' && kb === 'parent') return { relation: gb === 'male' ? 'father-in-law' : 'mother-in-law', gender: gb };
        if (ka === 'spouse' && kb === 'sibling') return { relation: gb === 'male' ? 'brother-in-law' : 'sister-in-law', gender: gb };
        if (ka === 'sibling' && kb === 'spouse') return { relation: gb === 'male' ? 'brother-in-law' : 'sister-in-law', gender: gb };
        if (ka === 'child' && kb === 'spouse') return { relation: gb === 'male' ? 'son-in-law' : 'daughter-in-law', gender: gb };
        if (ka === 'spouse' && kb === 'child') return { relation: gb === 'male' ? 'son' : 'daughter', gender: gb };

        if (chain.length >= 3) {
            const short = this.canonicalizeChain(chain.slice(1));
            if (short?.relation.startsWith('grand-'))
                return { relation: 'great-' + short.relation, gender: short.gender };
        }

        return null;
    }

    private chainToText(chain: string[]): string {
        return chain
            .map((rel, i) => {
                const syns = C_RELATIONS[rel]?.synonyms ?? [rel];
                const chosen = faker.helpers.arrayElement(syns);
                return i < chain.length - 1 ? `${chosen}'s` : chosen;
            })
            .join(' ');
    }

    private randomChain(depth: number): string[] {
        const base = ['father', 'mother', 'brother', 'sister', 'son', 'daughter', 'husband', 'wife'];
        const chain: string[] = [];
        for (let i = 0; i < depth; i++) chain.push(faker.helpers.arrayElement(base));
        return chain;
    }

    private getContextualDistractors(correct: string): string[] {
        const groups: Record<string, string[]> = {
            parent: ['father', 'mother', 'father-in-law', 'mother-in-law'],
            child: ['son', 'daughter', 'son-in-law', 'daughter-in-law'],
            sibling: ['brother', 'sister', 'brother-in-law', 'sister-in-law', 'cousin'],
            grand: [
                'grand-father', 'grand-mother',
                'grand-son', 'grand-daughter',
                'great-grand-father', 'great-grand-mother',
                'great-grand-son', 'great-grand-daughter',
            ],
            inlaw: [
                'father-in-law', 'mother-in-law',
                'brother-in-law', 'sister-in-law',
                'son-in-law', 'daughter-in-law',
            ],
            extended: ['uncle', 'aunt', 'nephew', 'niece', 'cousin'],
        };

        const pool = Object.values(groups).flat();
        const category = Object.entries(groups).find(([_, vals]) => vals.includes(correct))?.[0];
        let related = category ? groups[category] : pool;

        // fallback safety — ensures we always have something to pick
        if (!related || related.length === 0) related = pool;

        const filtered = related.filter(r => r !== correct);
        const others = pool.filter(r => !related.includes(r));

        // ensure at least three distractors even if arrays are small
        const safeFiltered = filtered.length ? filtered : pool.filter(r => r !== correct);

        const distractors = [
            ...faker.helpers.arrayElements(safeFiltered, Math.min(2, safeFiltered.length)),
            faker.helpers.arrayElement(others.length ? others : pool),
        ];

        // remove duplicates and shuffle
        return faker.helpers.shuffle([...new Set(distractors)]);
    }

    generateMany(count = 10, level: EDifficultyLevel = EDifficultyLevel.MEDIUM): RelationDto[] {
        const out: RelationDto[] = [];

        const depthMap: Record<EDifficultyLevel, { min: number; max: number }> = {
            [EDifficultyLevel.EASY]: { min: 2, max: 3 },
            [EDifficultyLevel.MEDIUM]: { min: 3, max: 4 },
            [EDifficultyLevel.HARD]: { min: 4, max: 5 }
        };

        const { min, max } = depthMap[level];
        let safety = 0;

        while (out.length < count && safety < count * 10) {
            safety++;

            const depth = faker.number.int({ min, max });
            const chain = this.randomChain(depth);
            const relation = this.canonicalizeChain(chain);

            if (!relation) continue;

            const chainText = this.chainToText(chain);
            if (!chainText.includes("'s")) continue;

            const name = faker.person.firstName();
            const pronoun = faker.helpers.arrayElement(['his', 'her', 'their']);
            const template = faker.helpers.arrayElement(C_QUEST_TEMPLATES);

            const question = template
                .replace('{chain}', chainText)
                .replaceAll('{name}', name)
                .replaceAll('{possPronoun}', pronoun);

            const correct = relation.relation;
            const distractors = this.getContextualDistractors(correct);

            if (distractors.length < 3) continue; // ensures consistent options count

            const options = faker.helpers.shuffle([correct, ...distractors]);

            out.push({
                question,
                options,
                answer: correct,
                level,
            });
        }

        return out;
    }
}
