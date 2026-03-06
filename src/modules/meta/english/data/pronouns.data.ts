
export const PersonalPronouns = ["I", "you", "he", "she", "it", "we", "they"];
export const PossessivePronouns = ["mine", "yours", "his", "hers", "its", "ours", "theirs"];
export const PossessiveAdjectives = ["my", "your", "his", "her", "its", "our", "their"];
export const ReflexivePronouns = ["myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves"];
export const DemonstrativePronouns = ["this", "that", "these", "those"];
export const InterrogativePronouns = ["who", "whom", "whose", "which", "what"];
export const RelativePronouns = ["who", "whom", "whose", "which", "that"];
export const IndefinitePronouns = [
  "all", "another", "any", "anybody", "anyone", "anything",
  "each", "either", "everybody", "everyone", "everything",
  "few", "many", "nobody", "none", "one", "several",
  "somebody", "someone", "something", "both", "most", "much", "several"
];

export const PronounPool = {
  Personal: PersonalPronouns,
  Possessive: PossessivePronouns,
  PossessiveAdjective: PossessiveAdjectives,
  Reflexive: ReflexivePronouns,
  Demonstrative: DemonstrativePronouns,
  Interrogative: InterrogativePronouns,
  Relative: RelativePronouns,
  Indefinite: IndefinitePronouns
};