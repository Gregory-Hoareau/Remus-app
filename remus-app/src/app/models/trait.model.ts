export class Trait {
    name: string;
    value: string;
    type: string;
    
    constructor(name: string, type:string = '(.*)') {
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