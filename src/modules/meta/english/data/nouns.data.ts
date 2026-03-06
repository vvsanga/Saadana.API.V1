import { ENounCategory } from "../constants/eng.enum";

export const NounPool: Record<ENounCategory, string[]> = {
    [ENounCategory.HumanProper]: [
        "John", "Mary", "Alice", "Bob", "Michael", "Sarah", "David", "Emma", "Olivia", "William",
        "James", "Sophia", "Daniel", "Isabella", "Mia", "Charlotte", "Henry", "Amelia", "Ethan", "Liam"
    ],
    [ENounCategory.HumanCommon]: [
        "teacher", "doctor", "student", "lawyer", "farmer", "driver", "artist", "pilot", "soldier", "mechanic", "politician"
    ],
    [ENounCategory.Mammals]: [
        "bat", "bear", "buffalo", "camel", "cat", "cheetah", "chimpanzee", "cow", "deer", "dog", "dolphin", "donkey",
        "elephant", "fox", "giraffe", "goat", "gorilla", "hamster", "hippopotamus", "horse", "hyena", "jaguar", "kangaroo",
        "kitten", "leopard", "lion", "monkey", "mouse", "panda", "pig", "pony", "puppy", "rabbit", "rat",
        "rhinoceros", "sheep", "squirrel", "tiger", "whale", "wolf", "zebra"
    ],
    [ENounCategory.Birds]: [
        "chicken", "crow", "duck", "eagle", "goose", "hen", "ostrich", "owl", "parrot", "peacock", "penguin",
        "pigeon", "sparrow", "swan", "turkey", "woodpecker"
    ],
    [ENounCategory.Aquatic]: [
        "clownfish", "crab", "fish", "jellyfish", "lobster", "octopus", "seal", "seahorse", "shark", "shrimp", "squid", "starfish"
    ],
    [ENounCategory.Nature]: [
        "rain", "sun", "moon", "snow", "river", "wind", "fire"
    ],
    [ENounCategory.Groups]: [
        "team", "family", "crowd", "class", "army"
    ]
};

// export const NounPool: Record<ENounCategory, string[]> = {
//     [ENounCategory.HumanProper]: [
//         "John", "Mary", "Alice", "Bob", "Michael", "Sarah", "David", "Emma", "Olivia", "William",
//         "James", "Sophia", "Daniel", "Isabella", "Mia", "Charlotte", "Henry", "Amelia", "Ethan", "Liam"
//     ],
//     [ENounCategory.HumanCommon]: [
//         "teacher", "doctor", "student", "lawyer", "farmer", "driver", "artist", "pilot", "soldier", "mechanic", "politician"
//     ],
//     [ENounCategory.Mammals]: [
//         "bat", "bear", "buffalo", "camel", "cat", "cheetah", "chimpanzee", "cow", "deer", "dog", "dolphin", "donkey",
//         "elephant", "fox", "giraffe", "goat", "gorilla", "hamster", "hippopotamus", "horse", "hyena", "jaguar", "kangaroo",
//         "kitten", "leopard", "lion", "monkey", "mouse", "panda", "pig", "pony", "puppy", "rabbit", "rat",
//         "rhinoceros", "sheep", "squirrel", "tiger", "whale", "wolf", "zebra"
//     ],
//     [ENounCategory.Birds]: [
//         "chicken", "crow", "duck", "eagle", "goose", "hen", "ostrich", "owl", "parrot", "peacock", "penguin",
//         "pigeon", "sparrow", "swan", "turkey", "woodpecker"
//     ],
//     [ENounCategory.Aquatic]: [
//         "clownfish", "crab", "fish", "jellyfish", "lobster", "octopus", "seal", "seahorse", "shark", "shrimp", "squid", "starfish"
//     ],
//     [ENounCategory.Nature]: [
//         "rain", "sun", "moon", "", "", "", ""
//     ],
//     [ENounCategory.Groups]: [
//         "team", "family", "crowd", "class", "army"
//     ]
// };

// [ENounCategory.PlacesProper]: [
//     "Paris", "London", "New York", "Tokyo", "Sydney", "Berlin", "Moscow", "Rome", "Beijing",
// ],
// [ENounCategory.PlacesCommon]: [
//     "school", "park", "library", "restaurant", "market", "street", "garden", "playground",
//     "museum", "hospital", "theater", "station", "airport", "bridge", "beach", "cafe",
//     "square", "stadium", "church", "hotel", "mall", "bank", "gym", "harbor", "fountain", "zoo"
// ],
// [ENounCategory.Objects]: [
//     "chair", "table", "phone", "computer", "perfume", "book", "lamp", "bag", "cup", "pen",
//     "bottle", "key", "wallet", "shoe", "watch", "glasses", "notebook", "television", "camera",
//     "sofa", "pillow", "desk", "fan", "clock", "brush", "knife", "plate", "fork", "spoon",
//     "remote", "charger", "headphones", "microphone", "guitar", "bicycle", "backpack", "umbrella", "suitcase", "mirror"
// ],
// [ENounCategory.Food]: [
//     "apple", "banana", "beans", "beetroot", "bitter gourd", "blackberry", "blueberry", "bottle gourd",
//     "brinjal", "broccoli", "cabbage", "carrot", "capsicum", "cauliflower", "cherry", "chili", "coconut",
//     "corn", "cranberry", "cucumber", "custard apple", "date", "dragonfruit", "drumstick", "fig",
//     "ginger", "gooseberry", "grape", "guava", "jackfruit", "jamun", "kiwi", "ladyfinger", "lemon",
//     "lychee", "mango", "melon", "onion", "orange", "papaya", "passionfruit", "peach", "pear", "peas",
//     "persimmon", "pineapple", "plum", "pomegranate", "potato", "pumpkin", "radish", "ridge gourd",
//     "sapota", "spinach", "strawberry", "starfruit", "sweet potato", "tomato", "watermelon", "yam"
// ],
// [ENounCategory.Emotions]: [
//     "love", "happiness", "freedom", "anger", "sadness", "fear", "jealousy", "pride",
//     "envy", "gratitude", "hope", "excitement", "loneliness", "trust", "surprise",
//     "anxiety", "compassion", "disappointment", "curiosity", "guilt", "joy", "frustration", "relief"
// ],
// [ENounCategory.Events]: [
//     "meeting", "concert", "festival", "wedding", "party", "competition", "lecture",
//     "conference", "ceremony", "celebration", "exhibition", "tournament", "parade", "rally",
//     "workshop", "seminar", "reunion", "fair", "match", "gala"
// ],
// [ENounCategory.Groups]: [
//     "Flock", "Herd", "Kittens", "Puppies", "Shoal", "School", "Clowder", "Gaggle", "Hive", "Nest",
//     "Pack", "Pod", "Swarm", "Bale", "Caravan", "Colony", "Convocation", "Den", "Exaltation", "Murder",
//     "Parliament", "Pride", "Sleuth", "Troop", "Band", "Children", "Class", "Classmates", "Club",
//     "Crowd", "Family", "Neighbors", "Party", "Players", "Staff", "Audience", "Crew", "Squad",
//     "Delegation", "Gang", "Panel", "Tribe", "Library", "Toys", "Fleet", "Batch", "Brood", "Bunch",
//     "Bundle", "Chain", "Collection", "Constellation", "Deck", "Galaxy", "Orchestra", "Range", "Star cluster", "Suite"
// ],  
