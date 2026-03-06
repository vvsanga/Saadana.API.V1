export class EnumUtil {

    private static enumKeys<T extends Record<string, any>>(e: T): (keyof T)[] {
        return Object.keys(e).filter(k => isNaN(Number(k))) as (keyof T)[];
    }

    static getKey<T extends Record<string, string | number>>(
        enumObj: T,
        input: string | number
    ): keyof T {
        const keys = this.enumKeys(enumObj);

        const key =
            keys.find(k => String(k).toLowerCase() === String(input).toLowerCase()) ??
            keys.find(k => enumObj[k] === input);

        if (!key) {
            throw new Error(`Enum key not found for input: ${JSON.stringify(input)}`);
        }

        return key;
    }

    static getValue<T extends Record<string, string | number>>(
        enumObj: T,
        input: string | number
    ): T[keyof T] {
        const key = this.getKey(enumObj, input);
        return enumObj[key];
    }

    static exists<T extends Record<string, string | number>>(
        enumObj: T,
        input: string | number
    ): boolean {
        try {
            this.getKey(enumObj, input);
            return true;
        } catch {
            return false;
        }
    }

    static getRandom<T extends Record<string, string | number>>(
        enumObj: T,
        index: number,
        type: 'key' | 'value'
    ): keyof T | T[keyof T] {
        const keys = this.enumKeys(enumObj);

        if (index < 0 || index >= keys.length) {
            throw new Error(`Index out of bounds: ${index}`);
        }

        const key = keys[index];
        return type === 'key' ? key : enumObj[key];
    }
}
