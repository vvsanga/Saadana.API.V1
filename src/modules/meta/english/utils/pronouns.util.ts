
const mapPronounToObject: Record<string, string> = {
    I: "me",
    we: "us",
    you: "you",
    he: "him",
    she: "her",
    it: "it",
    they: "them"
};

export function GetPronounObjectMap(word: string): string {
    return mapPronounToObject[word] || word;
}

// const modals: Set<string> = new Set([
//     "can", "could", "may", "might", "must", "shall", "should", "will", "would", "ought"
// ]);

// const modalContractions: Record<string, string> = {
//     "will not": "won't",
//     "shall not": "shan't",
//     "cannot": "can't",
//     "could not": "couldn't",
//     "should not": "shouldn't",
//     "would not": "wouldn't",
//     "must not": "mustn't",
//     "may not": "mayn't",
//     "might not": "mightn't",
// };
