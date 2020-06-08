export class Trait {
    name: string;
    value: number;
    
    constructor(name: string) {
        this.name = name;
        this.value = -1
    }

    equals(other: any) {
        if (other instanceof Trait) {
            return other.name === this.name && other.value === this.value
        }
        return false;
    }
}