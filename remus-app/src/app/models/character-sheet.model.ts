import {Trait} from './trait.model';
import { Skill } from './skill.model';

export interface CharacterSheet {
    img: string;
    name: string;
    age: number;
    sex: string;
    background: string;
    traits: Trait[];
    skills: Skill[];
}


