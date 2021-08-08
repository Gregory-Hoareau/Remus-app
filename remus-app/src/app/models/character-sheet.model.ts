import {Trait} from './trait.model';
import { Skill } from './skill.model';

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
    tags: string = '';
    img: string = null;
    name: Trait = new Trait('nom')
    age: Trait = new Trait('age','^[0-9][0-9]*$')
    sex: Trait = new Trait('sexe')
    background: Trait = new Trait('origines')
    traits: Trait[] = [];
    skills: Skill[] = [];
    other_personal?: Trait[] = null;

    isEmpty() {
        let empty_skill = true;
        let empty_trait = true;
        let empty_other = true;

        for (const t of this.traits) {
            console.log(typeof(t))
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

        return this.age.value === '' && this.img === null && this.name.value === '' 
                && this.background.value === '' && empty_skill && empty_trait && empty_other
    }
}

// Character Sheet of Dongeons and dragons
export class DnDCharacterSheet extends CharacterSheet {
    template = 'D&D';
    tags = 'd&d,fantasy';
    other_personal = [
        new Trait('Race'),
        new Trait('Classe')
    ];

    traits = [
        new Trait('Force','^-?[0-9]*$'),
        new Trait('Dextérité','^-?[0-9]*$'),
        new Trait('Endurance','^-?[0-9]*$'),
        new Trait('Intelligence','^-?[0-9]*$'),
        new Trait('Perception','^-?[0-9]*$')
    ];
}

// Character Sheet for Aventure (RPG of Mayhar)
export class AventureCharacterSheet extends CharacterSheet {
    template = 'Aventure'
    tags = 'aventure,fantasy';
    other_personal =  [
        new Trait('Race'),
        new Trait('Classe')
    ];

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
    tags = 'wod,wta,werewolf,modern';
    other_personal =  [
        new Trait('Race'),
        new Trait('Auspice'),
        new Trait('Tribue')
    ];
}

// Character Sheets for Star Wars
export class StarWarsCharacterSheet extends CharacterSheet {
    template = 'SW';
    tags = 'sw,sf,space';
    traits = [
        new Trait('Vigueur'),
        new Trait('Agilité'),
        new Trait('Intelligence'),
        new Trait('Ruse'),
        new Trait('Volonté'),
        new Trait('Présence'),
        new Trait('Valeur de Force')
    ];
    other_personal = [
        new Trait('Espèce'),
        new Trait('Carrière'),
        new Trait('Spécialité')
    ];
}

// Character Sheets for Legend of the 5 rings
export class L5RCharacterSheet extends CharacterSheet {
    template = 'L5R';
    tags = 'l5r';
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
        new Trait('Clan'),
        new Trait('École')
    ]
}

// Customisable Character Sheets
export class CustomCharacterSheet extends CharacterSheet {
    template = 'Custom'
    other_personal = [];

    constructor(sheet: CharacterSheet) {
        super();
        if (sheet) {
            this.tags = sheet.tags;
            this.other_personal = sheet.other_personal;
            //this.traits = sheet.traits;
            for(const t of sheet.traits) {
                this.traits.push(new Trait(t.name))
            }
        }
    }
}
