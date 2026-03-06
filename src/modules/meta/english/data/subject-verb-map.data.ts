import { ENounCategory } from "../constants/eng.enum";

// --- Common action/emotion pools ---
const basicActions = ["eat", "sleep", "play"];
const commonActions = ["walk", "run"];
const commonEmotions = ["love", "hate", "like", "dislike", "enjoy", "fear"];
const humanActions = ["talk", "speak", "ask", "study", "teach", "learn", "write", "read", "listen"];

// --- Common verbs by category ---
export const CommonVerbMap: Record<ENounCategory, string[]> = {
    [ENounCategory.HumanProper]: [...basicActions, ...commonActions, ...commonEmotions, ...humanActions],
    [ENounCategory.HumanCommon]: [...basicActions, ...commonActions, ...commonEmotions, ...humanActions],
    [ENounCategory.Mammals]: [...basicActions, ...commonActions, "jump"],
    [ENounCategory.Birds]: [...basicActions, "fly"],
    [ENounCategory.Aquatic]: [...basicActions, "swim", "jump"],
    [ENounCategory.Groups]: ["gather", "support", "cheer", "compete", "win", "march", "fight"],
    [ENounCategory.Nature]: []
};

// --- Specific verbs per individual noun ---
export const NounVerbMap: Record<string, string[]> = {
    // HumanCommon
    teacher: ["teach", "explain"],
    student: ["study", "write", "read", "listen"],
    doctor: ["heal", "examine"],

    // Mammals (extra)
    lion: ["roar", "hunt"],
    tiger: ["roar", "hunt"],
    dog: ["bark", "wag"],
    cat: ["meow", "hunt", "purr", "scratch"],
    cow: ["moo", "graze"],
    elephant: ["trumpet", "carry"],
    horse: ["neigh", "gallop"],
    bear: ["growl", "hunt"],
    monkey: ["scream", "climb"],
    panda: ["chew"],
    kangaroo: ["hop"],
    mouse: ["squeak", "scurry"],
    rabbit: ["hop", "twitch"],
    wolf: ["howl", "hunt"],
    dolphin: ["click", "swim"],
    whale: ["sing", "dive"],

    // Birds
    sparrow: ["chirp", "sing"],
    eagle: ["screech", "hunt"],
    parrot: ["squawk", "talk"],
    penguin: ["waddle", "swim"],
    ostrich: ["run"],
    owl: ["hoot"],
    crow: ["caw"],
    rooster: ["crow"],

    // Aquatic
    clownfish: ["swim", "hide"],
    crab: ["scuttle"],
    jellyfish: ["drift"],
    shark: ["hunt", "swim"],
    octopus: ["ink", "crawl", "swim"],
    seahorse: ["swim"],
    starfish: ["stick"],

    // Nature
    rain: ["fall"],
    sun: ["shine", "rise", "set"],
    moon: ["glow"],
    snow: ["fall", "melt"],
    river: ["flow"],
    wind: ["blow"],
    fire: ["burn", "spread"],

    // Groups
    team: ["play", "compete", "win"],
    family: ["gather", "support", "love"],
    crowd: ["cheer", "protest", "gather"],
    class: ["study", "learn"],
    army: ["march", "fight"]
};


export const ObjectPool = {
    food: ["apple", "banana", "bread", "carrot", "fish", "meat", "grass"],
    things: ["book", "pen", "phone", "computer", "ball", "car", "house"],
    nature: ["tree", "flower", "river", "mountain", "star", "fire"],
    people: ["teacher", "doctor", "friend", "child", "student"],
    abstract: ["love", "idea", "plan", "dream", "hope"]
};

export interface IVerbObjectMap {
    verb: string;
    objects?: string[]; // optional, not every verb needs an object
}

export const NounVerbObjectMap: Record<string, IVerbObjectMap[]> = {
    // Humans
    student: [
        { verb: "read", objects: ObjectPool.things.filter(o => ["book", "pen"].includes(o)) },
        { verb: "write", objects: ["essay", "letter", "note"] },
        { verb: "ask", objects: ObjectPool.people },
        { verb: "study", objects: ["math", "science", "history"] }
    ],
    teacher: [
        { verb: "teach", objects: ["students", "class", "lesson"] },
        { verb: "explain", objects: ["concept", "problem", "topic"] }
    ],

    // Animals
    dog: [
        { verb: "eat", objects: ["bone", "meat"] },
        { verb: "chase", objects: ["cat", "ball"] },
        { verb: "bark" } // no object needed
    ],
    cat: [
        { verb: "eat", objects: ["fish", "mouse"] },
        { verb: "hunt", objects: ["mouse", "bird"] },
        { verb: "scratch", objects: ["sofa", "tree"] }
    ],
    cow: [
        { verb: "eat", objects: ["grass"] },
        { verb: "moo" } // no object
    ],

    // Groups
    team: [
        { verb: "play", objects: ["game", "match"] },
        { verb: "win", objects: ["trophy", "competition"] },
        { verb: "support", objects: ["fans", "members"] }
    ]
};

