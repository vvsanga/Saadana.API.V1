// same verb forms v1, v2, v3
const sameVerbs: Set<string> = new Set([
    "bet", "broadcast", "cost", "cut", "hurt", "put", "quit", "read"
]);

// all different form of verbs.
const irregularVerbs1: Record<string, [string, string]> = {
    arise: ["arose", "arisen"],
    awake: ["awoke", "awoken"],
    be: ["was/were", "been"],
    become: ["became", "become"],
    begin: ["began", "begun"],
    break: ["broke", "broken"],
    choose: ["chose", "chosen"],
    come: ["came", "come"],
    dive: ["dove", "dived"],
    do: ["did", "done"],
    draw: ["drew", "drawn"],
    drink: ["drank", "drunk"],
    drive: ["drove", "driven"],
    eat: ["ate", "eaten"],
    fall: ["fell", "fallen"],
    fly: ["flew", "flown"],
    forbid: ["forbade", "forbidden"],
    foresee: ["foresaw", "foreseen"],
    forget: ["forgot", "forgotten"],
    forgive: ["forgave", "forgiven"],
    forsake: ["forsook", "forsaken"],
    forswear: ["forswore", "forsworn"],
    freeze: ["froze", "frozen"],
    get: ["got", "gotten"],
    give: ["gave", "given"],
    go: ["went", "gone"],
    grow: ["grew", "grown"],
    hide: ["hid", "hidden"],
    know: ["knew", "known"],
    lie: ["lay", "lain"],
    overcome: ["overcame", "overcome"],
    overtake: ["overtook", "overtaken"],
    overthrow: ["overthrew", "overthrown"],
    partake: ["partook", "partaken"],
    prove: ["proved", "proven"],
    ride: ["rode", "ridden"],
    ring: ["rang", "rung"],
    rise: ["rose", "risen"],
    run: ["ran", "run"],
    see: ["saw", "seen"],
    sew: ["sewed", "sewn"],
    shake: ["shook", "shaken"],
    show: ["showed", "shown"],
    shrink: ["shrank", "shrunk"],
    sing: ["sang", "sung"],
    sink: ["sank", "sunk"],
    slay: ["slew", "slain"],
    smite: ["smote", "smitten"],
    speak: ["spoke", "spoken"],
    spring: ["sprang", "sprung"],
    steal: ["stole", "stolen"],
    strive: ["strove", "striven"],
    swear: ["swore", "sworn"],
    swell: ["swelled", "swollen"],
    swim: ["swam", "swum"],
    take: ["took", "taken"],
    tear: ["tore", "torn"],
    thrive: ["throve", "thriven"],
    throw: ["threw", "thrown"],
    undertake: ["undertook", "undertaken"],
    wake: ["woke", "woken"],
    wear: ["wore", "worn"],
    weave: ["wove", "woven"],
    write: ["wrote", "written"]
};

// v2 = v3, mean same for of v2 and v3
const irregularVerbs2: Record<string, string> = {
    abide: "abode",
    apply: "applied",
    bleed: "bled",
    bring: "brought",
    build: "built",
    buy: "bought",
    carry: "carried",
    catch: "caught",
    cling: "clung",
    copy: "copied",
    creep: "crept",
    cry: "cried",
    curry: "curried",
    deal: "dealt",
    dig: "dug",
    dream: "dreamt",
    envy: "envied",
    feed: "fed",
    feel: "felt",
    fight: "fought",
    find: "found",
    fry: "fried",
    grind: "ground",
    hang: "hung",
    have: "had",
    hold: "held",
    hurry: "hurried",
    keep: "kept",
    kneel: "knelt",
    lay: "laid",
    lead: "led",
    leap: "leapt",
    leave: "left",
    lend: "lent",
    light: "lit",
    lose: "lost",
    make: "made",
    marry: "married",
    mean: "meant",
    meet: "met",
    mislead: "misled",
    pay: "paid",
    rend: "rent",
    reply: "replied",
    satisfy: "satisfied",
    say: "said",
    seek: "sought",
    sell: "sold",
    send: "sent",
    shoot: "shot",
    sit: "sat",
    sleep: "slept",
    slide: "slid",
    smell: "smelt",
    spell: "spelt",
    spend: "spent",
    spin: "spun",
    spit: "spat",
    spoil: "spoilt",
    stand: "stood",
    stick: "stuck",
    strike: "struck",
    study: "studied",
    sweep: "swept",
    swing: "swung",
    teach: "taught",
    tell: "told",
    think: "thought",
    tidy: "tidied",
    try: "tried",
    understand: "understood",
    win: "won",
    withhold: "withheld",
    withstand: "withstood",
    worry: "worried",
    wring: "wrung"
};

// ✅ irregular 3rd-person singular forms
export const Irregular3rdPerson: Record<string, string> = {
    be: "is",
    have: "has",
    do: "does",
    go: "goes",
    say: "says"
};

// varbs append 'd' for v2 and v3
const reggularVerbs1: Set<string> = new Set([
    "achieve", "admire", "adore", "advise", "agree", "amuse", "announce", "apologize", "appreciate", "approve",
    "arbitrate", "argue", "arrange", "arrive", "bake", "balance", "bathe", "believe", "blame", "bore",
    "bounce", "brake", "bruise", "calculate", "care", "change", "chase", "close", "compare", "compete",
    "confuse", "console", "continue", "corrode", "dance", "dare", "decide", "decorate", "deprive", "derive",
    "describe", "desire", "disagree", "dislike", "divide", "dribble", "encourage", "erase", "escape", "examine",
    "exercise", "explore", "gaze", "handle", "hate", "hear", "hope", "imagine", "imitate", "improve",
    "include", "increase", "intervene", "introduce", "invite", "joke", "juggle", "like", "live", "love",
    "manage", "measure", "move", "name", "note", "notice", "nudge", "observe", "overhear", "phone",
    "poke", "praise", "prepare", "presume", "promise", "provide", "race", "raise", "realize", "receive",
    "recognize", "reduce", "release", "rescue", "revise", "rinse", "save", "scare", "score", "seize",
    "serve", "share", "skate", "smile", "sneeze", "snore", "solve", "sparkle", "stare", "stumble",
    "subdue", "supersede", "suppose", "surprise", "taste", "tease", "tickle", "tie", "trace", "underline",
    "use", "wave", "welcome", "whistle", "wipe"
]);

// varbs append 'ed' for v2 and v3
const reggularVerbs2: Set<string> = new Set([
    "accept", "act", "add", "admit", "alert", "allow", "answer", "applaud", "ask", "attack",
    "attend", "avoid", "ban", "bark", "beam", "beg", "belong", "betray", "blink", "blush",
    "boil", "borrow", "bother", "brush", "bump", "burn", "call", "camp", "charm", "check",
    "cheer", "chew", "chop", "clap", "clean", "climb", "clutch", "collect", "comb", "comfort",
    "complain", "compliment", "comprehend", "confess", "conquer", "contradict", "cook", "correct", "cough", "count",
    "cover", "crack", "crash", "crawl", "cross", "defend", "delay", "deliver", "design", "destroy",
    "develop", "discover", "discuss", "doubt", "drag", "dress", "drip", "drop", "earn", "enjoy",
    "entail", "enter", "explain", "fetch", "fill", "finish", "fix", "fold", "frighten", "frown",
    "gather", "grab", "greet", "guard", "guess", "help", "hop", "hug", "hunt", "impress",
    "iron", "jam", "jealous", "jog", "join", "jump", "kick", "kiss", "knead", "knit",
    "knock", "laugh", "learn", "lick", "lift", "listen", "lock", "look", "march", "mark",
    "match", "melt", "mend", "mention", "miss", "mix", "mop", "murmur", "need", "nod",
    "obey", "offer", "open", "pack", "paint", "pass", "pat", "peel", "peep", "peer",
    "perform", "pinch", "plan", "plant", "play", "plug", "point", "polish", "post", "pour",
    "prefer", "present", "press", "pretend", "print", "protect", "pull", "push", "rain", "reach",
    "refrain", "regret", "remember", "repair", "repeat", "report", "respect", "rest", "return", "roar",
    "roll", "rub", "rush", "sail", "scold", "scratch", "scream", "scrub", "search", "seem",
    "shock", "shout", "skip", "slam", "slip", "snatch", "soak", "soar", "spill", "start",
    "stay", "stir", "stitch", "stop", "stretch", "submit", "succeed", "suck", "suggest", "support",
    "talk", "tap", "thank", "threaten", "touch", "tow", "train", "travel", "trip", "trust",
    "turn", "twist", "unpack", "visit", "wait", "walk", "wander", "want", "warn", "wash",
    "watch", "whisper", "wink", "wish", "wonder", "work", "wrap", "yawn", "yell", "zip"
]);

export const IdenticalVerbs: Record<string, [string, string]> = {
    ...Object.fromEntries(
        Array.from(sameVerbs).map(v => [v, [v, v]])
    )
}

export const IrregularVerbs: Record<string, [string, string]> = {
    ...irregularVerbs1,
    ...Object.fromEntries(
        Object.entries(irregularVerbs2).map(([k, v]) => [k, [v, v]])
    )
};

export const RegularVerbs: Record<string, [string, string]> = {
    ...Object.fromEntries(
        Array.from(reggularVerbs1).map(v => [v, [`${v}d`, `${v}d`]])
    ),
    ...Object.fromEntries(
        Array.from(reggularVerbs2).map(v => [v, [`${v}ed`, `${v}ed`]])
    )
};

export const Verbs: Record<string, [string, string]> = {
    ...IdenticalVerbs,
    ...IrregularVerbs,
    ...RegularVerbs
};