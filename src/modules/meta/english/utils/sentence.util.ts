import { GetRandomItem } from "../../../../core/utils/common.util";
import { ENounCategory } from "../constants/eng.enum";
import { NounPool } from "../data/nouns.data";
import { NounVerbObjectMap } from "../data/subject-verb-map.data";

export function GetRandomSubject(): { subject: string; category: ENounCategory } {
    const categories = Object.values(ENounCategory).filter(
        (val): val is ENounCategory => typeof val === "number"
    );

    const category = GetRandomItem(categories);
    const subject = GetRandomItem(NounPool[category]);
    return { subject, category };
}

export function GetRandomSubjectAndVerb(): { subject: string, verb: string, object?: string } {
    const subjects = Object.keys(NounVerbObjectMap);
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    const verbData = NounVerbObjectMap[subject];
    const chosenVerbObj = verbData[Math.floor(Math.random() * verbData.length)];

    const verb = chosenVerbObj.verb;
    const object = chosenVerbObj.objects
        ? chosenVerbObj.objects[Math.floor(Math.random() * chosenVerbObj.objects.length)]
        : undefined;

    return { subject, verb, object };
}

// ✅ Example usage
// const pair = getRandomVerbForSubject();
