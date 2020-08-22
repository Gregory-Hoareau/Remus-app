export class Trait {
    name: string;
    type: () => boolean;
    value: string;
    
    constructor(name: string) {
        this.name = name;
        this.value = undefined;
    }

    equals(other: any) {
        if (other instanceof Trait) {
            return other.name === this.name && other.value === this.value;
        }
        return false;
    }
}