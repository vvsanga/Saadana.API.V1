import { EAspect, ENounCategory, ENounType, ETense, EPerson, ENumber } from "../constants/eng.enum";

export interface INoun {
    word: string;
    category: ENounCategory;
    types: ENounType[];
}

export interface ISentenceOptions {
    subject: string;
    verb: string;
    tense: ETense;
    aspect: EAspect;
    object?: string;
    negative?: boolean;
    question?: boolean;
    modal?: string;
    subjectPerson?: EPerson;
    subjectNumber?: ENumber;
    passive?: boolean;
}

// person?: TPerson;
// number?: TNumber;
//// useContraction?: boolean;