export type TGender = 'male' | 'female' | 'unknown';
export type TRelationKind = 'parent' | 'child' | 'sibling' | 'spouse';

export enum EDifficultyLevel {
    EASY = 'E',
    MEDIUM = 'M',
    HARD = 'H',
    // Expert
}

export enum EScoreMode {
    SIMPLE = 'S',
    WEIGHTED = 'W'
}

export interface IRelation {
    kind: TRelationKind;
    gender: TGender;
    synonyms?: string[];
}

export const C_RELATIONS: Record<string, IRelation> = {
    father: { kind: 'parent', gender: 'male', synonyms: ['father', 'dad'] },
    mother: { kind: 'parent', gender: 'female', synonyms: ['mother', 'mom'] },
    son: { kind: 'child', gender: 'male', synonyms: ['son'] },
    daughter: { kind: 'child', gender: 'female', synonyms: ['daughter'] },
    brother: { kind: 'sibling', gender: 'male', synonyms: ['brother'] },
    sister: { kind: 'sibling', gender: 'female', synonyms: ['sister'] },
    husband: { kind: 'spouse', gender: 'male', synonyms: ['husband'] },
    wife: { kind: 'spouse', gender: 'female', synonyms: ['wife'] },
};

export const C_QUEST_TEMPLATES = [
    'Who is your {chain}?',
    'What do you call your {chain}?',
    'Your {chain} is your what?',
    'How are you related to your {chain}?',
    'In your family, what relation is your {chain}?',
    "If {name}'s {chain} visits, who is that to {name}?",
    "How is {name}'s {chain} related to {name}?",
    "What relation is {name}'s {chain} to {name}?",
    "When {name}'s {chain} comes over, who would that be to {name}?",
    'In relation to you, who is your {chain}?',
    'If you think of your {chain}, what do you call them?',
    'Within your family tree, your {chain} is your what?',
    'From your point of view, who is your {chain}?',
    'If {name} introduces their {chain}, who are they to {name}?',
    'In daily life, what do you call your {chain}?',
    'Tell me the relation of your {chain}.',
    'How would you describe your {chain}?',
    'Name the relation of your {chain}.',
    'Whom do you refer to as your {chain}?',
    'How is your {chain} related to you?',
    'Your {chain} would be considered your what?',
    "If {name}'s {chain} appears, who are they to {name}?",
    "If {name}'s {chain} gives advice, who is that to {name}?",
    "Imagine {name}'s {chain} visiting home, who is that to {name}?",
    "What do you call your {chain} in your family?",
    "Which relation best describes your {chain}?",
    "What family role does your {chain} hold?",
    "Identify the relation: your {chain}.",
    "Your {chain} would be recognized as your what?",
    "What name is given to your {chain} in family terms?",
    "If {name}'s {chain} arrives, who are they to {name}?",
];
