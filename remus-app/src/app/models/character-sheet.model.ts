import {Trait} from './trait.model';

export interface CharacterSheet {
    img: string;
    name: string;
    age: number;
    sex: string;
    background: string;
    traits: Trait[];
    skills: string[];
}


