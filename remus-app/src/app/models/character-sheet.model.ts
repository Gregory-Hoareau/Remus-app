import {Trait} from './trait.model';
import { Skill } from './skill.model';
import { PersonalData } from './personal-data.model';

export const all_templates = {
    'D&D': 'Donjons et Dragons',
    'WtA': 'Loup-Garou : l\'apocalypse',
    'SW': 'Star Wars',
    'Aventure': 'Aventure',
    'L5R': 'Légende des 5 anneaux',
    'Custom': 'Personnalisable'
}

export abstract class CharacterSheet {
    template: string = null;
    img: string = null;
    name: string = '';
    age: number = -1;
    sex: string = '';
    background: string = '';
    traits: Trait[] = [];
    skills: Skill[] = [];
    other_personal?: PersonalData[] = null;

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
    template = 'D&D';
    other_personal = [{
            name: 'Race',
            value: ''
        },{
            name: 'Classe',
            value: ''
        }
    ];

    traits = [
        new Trait('Force'),
        new Trait('Dextérité'),
        new Trait('Endurance'),
        new Trait('Intelligence'),
        new Trait('Perception')
    ];
}

// Character Sheet for Aventure (RPG of Mayhar)
export class AventureCharacterSheet extends CharacterSheet {
    template = 'Aventure'
    other_personal = [{
        name: 'Race',
        value: ''
    },{
        name: 'Classe',
        value: ''
    }];

    traits = [
        new Trait('Physique'),
        new Trait('Social'),
        new Trait('Mental')
    ];
}

// Character Sheets for Word of Darkness
export abstract class WoDCharacterSheet extends CharacterSheet {
    traits = [
        new Trait('Force'),
        new Trait('Dextérité'),
        new Trait('Vigueur'),
        new Trait('Charisme'),
        new Trait('Manipulation'),
        new Trait('Apparence'),
        new Trait('Perception'),
        new Trait('Intelligence'),
        new Trait('Astuce')
    ];
}

export class WtACharacterSheet extends WoDCharacterSheet {
    template = 'WtA';
    other_personal = [{
            name: 'Race',
            value: ''
        },{
            name: 'Auspice',
            value: ''
        },{
            name: 'Tribu',
            value: ''
        }
    ];
}

// Character Sheets for Star Wars
export class StarWarsCharacterSheet extends CharacterSheet {
    template = 'SW';
    traits = [
        new Trait('Vigueur'),
        new Trait('Agilité'),
        new Trait('Intelligence'),
        new Trait('Ruse'),
        new Trait('Volonté'),
        new Trait('Présence'),
        new Trait('Valeur de Force')
    ];
    other_personal = [{
            name: 'Espèce',
            value: ''
        },{
            name: 'Carrière',
            value: ''
        },{
            name: 'Spécialités',
            value: ''
        }
    ];
}

// Character Sheets for Legend of the 5 rings
export class L5RCharacterSheet extends CharacterSheet {
    template = 'L5R';
    traits = [
        new Trait('Terre'),
        new Trait('Constitution'),
        new Trait('Volonté'),
        new Trait('Eau'),
        new Trait('Force'),
        new Trait('Perception'),
        new Trait('Air'),
        new Trait('Réflexes'),
        new Trait('Intuition'),
        new Trait('Feu'),
        new Trait('Agilité'),
        new Trait('Intelligence'),
        new Trait('Vide')
    ];
    other_personal = [
        {
            name: 'Clan',
            value: ''
        },{
            name: 'École',
            value: ''
        }
    ]
}

// Customisable Character Sheets
export class CustomCharacterSheet extends CharacterSheet {
    template = 'Custom'
    other_personal = [];

    constructor(sheet: CharacterSheet) {
        super();
        if (sheet) {
            this.traits = sheet.traits;
            this.other_personal = sheet.other_personal;
        }
    }
}
