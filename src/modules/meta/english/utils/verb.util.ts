import { TVerbForm } from "../constants/eng.const";
import { EAspect, ENumber, EPerson, ETense } from "../constants/eng.enum";
import { IdenticalVerbs, IrregularVerbs, RegularVerbs } from "../data/verb-forms.data";

// const modals: Set<string> = new Set([
//     "can", "could", "may", "might", "must", "shall", "should", "will", "would", "ought"
// ]);

const thirdPersonExceptions: Record<string, string> = {
    be: "is",
    have: "has"
};

const ingFormExceptions: Record<string, string> = {
    be: "being",
};

export function GetHelpingVerb(tense: ETense, aspect: EAspect, person: EPerson, number: ENumber): string {
    const isSingular = number === ENumber.Singular;

    if (tense === ETense.Present) {
        if (aspect === EAspect.Simple || aspect === EAspect.Continuous) {
            if (person === EPerson.First && isSingular) return "am";
            if (person === EPerson.Third && isSingular) return "is";
            return "are";
        }
        if (aspect === EAspect.Perfect) {
            return person === EPerson.Third && isSingular ? "has" : "have";
        }
        if (aspect === EAspect.PerfectContinuous) {
            return person === EPerson.Third && isSingular ? "has been" : "have been";
        }
    }

    if (tense === ETense.Past) {
        if (aspect === EAspect.Simple || aspect === EAspect.Continuous) {
            if (person === EPerson.First && isSingular) return "was";
            if (person === EPerson.Third && isSingular) return "was";
            return "were";
        }
        if (aspect === EAspect.Perfect || aspect === EAspect.PerfectContinuous) {
            return aspect === EAspect.Perfect ? "had" : "had been";
        }
    }

    if (tense === ETense.Future) {
        if (aspect === EAspect.Simple) return "will";
        if (aspect === EAspect.Continuous) return "will be";
        if (aspect === EAspect.Perfect) return "will have";
        if (aspect === EAspect.PerfectContinuous) return "will have been";
    }

    return ""; // fallback
}

export function GetPersonNumber(subject: string): { person: EPerson; number: ENumber } {

    const pronouns: Record<string, { person: EPerson; number: ENumber }> = {
        I: { person: EPerson.First, number: ENumber.Singular },
        we: { person: EPerson.First, number: ENumber.Plural },
        you: { person: EPerson.Second, number: ENumber.Plural },
        he: { person: EPerson.Third, number: ENumber.Singular },
        she: { person: EPerson.Third, number: ENumber.Singular },
        it: { person: EPerson.Third, number: ENumber.Singular },
        they: { person: EPerson.Third, number: ENumber.Plural },
    };

    const lower = subject.toLowerCase();

    if (pronouns[subject]) return pronouns[subject];

    // Check if proper noun with multiple words (John and Mary)
    if (subject.includes(" and ")) return { person: EPerson.Third, number: ENumber.Plural };

    // Check plural common noun (ends with s)
    if (/[^\s]s$/i.test(subject)) return { person: EPerson.Third, number: ENumber.Plural };

    // Default to third person singular
    return { person: EPerson.Third, number: ENumber.Singular };
}

export function GetThirdPersonSingularVerb(v1: string): string {
    if (thirdPersonExceptions[v1]) return thirdPersonExceptions[v1];
    if (v1.endsWith("y") && !/[aeiou]y$/.test(v1)) {
        return v1.slice(0, -1) + "ies"; // study -> studies
    }
    if (/(s|sh|ch|x|z|o)$/.test(v1)) {
        return v1 + "es"; // fix -> fixes, wash -> washes
    }
    return v1 + "s"; // default
}

export function GetIngFormVerb(v1: string): string {
    if (ingFormExceptions[v1]) return ingFormExceptions[v1];
    if (v1.endsWith("ie")) return v1.slice(0, -2) + "ying"; // die -> dying
    if (v1.endsWith("e") && !/ee$/.test(v1)) return v1.slice(0, -1) + "ing"; // make -> making
    if (/[^aeiou][aeiou][^aeiou]$/.test(v1)) return v1 + v1.slice(-1) + "ing"; // run -> running
    return v1 + "ing"; // default
}

export function GetVerbForms(verb: string): TVerbForm {
    const lower = verb.toLowerCase();

    // --- Past forms: v2, v3 ---
    const [v2, v3] =
        RegularVerbs[lower] ||
        IrregularVerbs[lower] ||
        IdenticalVerbs[lower] ||
        [verb + "ed", verb + "ed"]; // fallback

    // --- Present participle (ing) ---
    const ing = GetIngFormVerb(lower);

    // --- 3rd person singular ---
    const vs = GetThirdPersonSingularVerb(lower);

    return { v1: verb, v2, v3, ing, vs };
}

export function GetVerbForm(verb: string, form: keyof TVerbForm): string {
    return GetVerbForms(verb)[form];
}
