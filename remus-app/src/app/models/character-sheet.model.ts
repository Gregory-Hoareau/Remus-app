import {Trait} from './trait.model';
import { Skill } from './skill.model';
import { PersonalData } from './personal-data.model';

export abstract class CharacterSheet {
    img: string = null;
    name: string = '';
    age: number = -1;
    sex: string = '';
    background: string = '';
    traits: Trait[] = [];
    skills: Skill[] = [];
    other_personal?: PersonalData[] = undefined;

    isEmpty() {
        let empty_skill = true;
        let empty_trait = true;
        let empty_other = true;

        for (const t of this.traits) {
            empty_trait = empty_trait && t.equals(new Trait(t.name));
        }
        for (const s of this.skills) {
            empty_skill = empty_skill && s.name === '';
        }
        if (this.other_personal) {
            for (const d of this.other_personal) {
                empty_other = empty_other && d.value === '';
            }
        }

        return this.age === -1 && this.img === null && this.name === '' 
                && this.background === '' && empty_skill && empty_trait && empty_other
    }
}

// Character Sheet of Dongeons and dragons
export class DnDCharacterSheet extends CharacterSheet {
    other_personal = [{
        name: 'Race',
        value: ''
    },{
        name: 'Classe',
        value: ''
    }]

    traits = [new Trait('Force'),
    new Trait('Dextérité'),
    new Trait('Endurance'),
    new Trait('Intelligence'),
    new Trait('Perception')];
}

// Character Sheet for Aventure (RPG of Mayhar)
export class AventureCharacterSheet extends CharacterSheet {
    other_personal = [{
        name: 'Race',
        value: ''
    },{
        name: 'Classe',
        value: ''
    }]

    traits = [new Trait('Physique'),
    new Trait('Social'),
    new Trait('Mental')]
}

// Character Sheets for Word of Darkness
export abstract class WoDCharacterSheet extends CharacterSheet {
    traits = [new Trait('Force'),
    new Trait('Dextérité'),
    new Trait('Vigueur'),
    new Trait('Charisme'),
    new Trait('Manipulation'),
    new Trait('Apparence'),
    new Trait('Perception'),
    new Trait('Intelligence'),
    new Trait('Astuce')]
}

export class WtACharacterSheet extends WoDCharacterSheet {
    other_personal = [{
        name: 'Race',
        value: ''
    },{
        name: 'Auspice',
        value: ''
    },{
        name: 'Tribu',
        value: ''
    }]
}


