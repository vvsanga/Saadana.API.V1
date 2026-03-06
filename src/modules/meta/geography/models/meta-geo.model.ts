export enum EWaterBodyType {
    OCEAN = 'O',
    SEA = 'S',
    GULF = 'G',
    BAY = 'B',
    LAKE = 'L'
}

export enum ETemperature {
    HOT = 'H',
    WARM = 'W',
    COLD = 'C',
    POLAR = 'P',
}

export enum EWaterSalinity {
    SALT = 'S',
    BRACKISH = 'B',
    FRESH = 'F',
}

export enum EColor {
    BLUE = 'B',
    GREEN = 'G',
    TURQUOISE = 'T',
    BROWN = 'N',
    BLACK = 'K',
    MIXED = 'M',
}

export enum EWaterClarity {
    CLEAR = 'C',
    MODERATE = 'M',
    TURBID = 'T',
}

export enum ECoastalType {
    SANDY = 'S',
    ROCKY = 'R',
    CORAL = 'C',
    MUDDY = 'M',
    MIXED = 'X',
}

// 'B' | 'G' | 'T' | 'N' | 'K' | 'M'; // optional enum like waterbody
export enum ELevel {
    LOW = 'L',
    MEDIUM = 'M',
    HIGH = 'H'
}