import { EAspect, ENumber, EPerson, ETense } from "../constants/eng.enum";
import { ISentenceOptions } from "../models/sentence.model";
import { GetPronounObjectMap } from "./pronouns.util";
import { GetHelpingVerb, GetPersonNumber, GetVerbForms } from "./verb.util";

export function GenerateSentence(options: ISentenceOptions): string {
    const {
        subject,
        verb,
        object,
        tense,
        aspect,
        negative = false,
        question = false,
        modal,
        subjectPerson,
        subjectNumber,
        passive = false
    } = options;

    // Determine subject person/number
    const { person, number } = subjectPerson && subjectNumber
        ? { person: subjectPerson, number: subjectNumber }
        : GetPersonNumber(subject);

    const forms = GetVerbForms(verb);

    const prependNegation = (helping: string) => negative ? `${helping} not` : helping;
    const sentenceObject = object ? ` ${object}` : "";

    // -----------------------------
    // Passive Voice
    // -----------------------------
    if (passive) {
        const mainVerb = forms.v3; // past participle
        const byPhrase = subject ? ` by ${GetPronounObjectMap(subject)}` : "";
        const newSubject = object ? GetPronounObjectMap(object) : "It";

        let helping: string;
        if (modal) {
            helping =
                aspect === EAspect.Perfect || aspect === EAspect.PerfectContinuous ? `${modal} have been` :
                    aspect === EAspect.Continuous ? `${modal} be being` :
                        `${modal} be`;
        } else {
            helping = GetHelpingVerb(tense, aspect, person, number);
        }

        helping = prependNegation(helping);

        if (question) {
            const helpingPart = modal ? helping.replace(modal, "").trim() : helping;
            return `${modal ? modal + " " : ""}${newSubject} ${helpingPart} ${mainVerb}${byPhrase}?`;
        }

        return `${newSubject} ${helping} ${mainVerb}${byPhrase}`;
    }

    // -----------------------------
    // Active Voice
    // -----------------------------
    let helping = "";
    let mainVerb = "";

    if (modal) {
        helping = modal;
        mainVerb =
            aspect === EAspect.Perfect ? `have ${forms.v3}` :
                aspect === EAspect.Continuous ? `be ${forms.ing}` :
                    aspect === EAspect.PerfectContinuous ? `have been ${forms.ing}` :
                        forms.v1;
    } else {
        switch (aspect) {
            case EAspect.Simple:
                // ✅ No helping verb in simple tense
                if (tense === ETense.Present && person === EPerson.Third && number === ENumber.Singular) {
                    mainVerb = forms.vs; // writes, sleeps
                } else if (tense === ETense.Past) {
                    mainVerb = forms.v2; // wrote, slept
                } else {
                    mainVerb = forms.v1; // write, sleep
                }
                break;

            case EAspect.Continuous:
                helping = GetHelpingVerb(tense, aspect, person, number);
                mainVerb = forms.ing; // is swimming
                break;

            case EAspect.Perfect:
                helping = GetHelpingVerb(tense, aspect, person, number);
                mainVerb = forms.v3; // has eaten
                break;

            case EAspect.PerfectContinuous:
                helping = GetHelpingVerb(tense, aspect, person, number);
                mainVerb = `been ${forms.ing}`; // has been running
                break;
        }
    }

    helping = prependNegation(helping);

    if (question) {
        return `${helping} ${subject} ${mainVerb}${sentenceObject}?`.trim();
    }

    return `${subject} ${helping} ${mainVerb}${sentenceObject}`.trim();
}
