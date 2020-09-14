export class Trait {
    name: string;
    value: string;
    type: RegExp;
    
    constructor(name: string, type:RegExp = /(.*)/) {
        this.name = name;
        this.value = undefined;
        this.type = type;
    }

    equals(other: any) {
        if (other instanceof Trait) {
            return other.name === this.name && other.value === this.value;
        }
        return false;
    }
}