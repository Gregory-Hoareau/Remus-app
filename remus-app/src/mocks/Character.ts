import { CharacterSheet } from 'src/app/models/character-sheet.model';

export let all_characters: CharacterSheet[] = [
    {
        img: null,
        name: 'Eude',
        age: 23,
        sex: 'Homme',
        background: '',
        traits: [{
          name: 'Force',
          value: -1,
        }, {
          name: 'Endurance',
          value: -1,
        }, {
          name: 'Intelligence',
          value: -1,
        }, {
          name: 'Perception',
          value: -1,
        }, {
          name: 'Charisme',
          value: -1,
        }, {
          name: 'Dextérité',
          value: -1,
        }],
        skills: [
          {
            name: 'Conduite',
          },
          {
            name: 'Instinct animal',
          },
          {
            name: 'Bagarre',
          }
        ]
      } as CharacterSheet,
      {
        img: null,
        name: 'Albus',
        age: 1500,
        sex: 'Homme',
        background: 'Vieu sorcier',
        traits: [{
          name: 'Force',
          value: -1,
        }, {
          name: 'Endurance',
          value: -1,
        }, {
          name: 'Intelligence',
          value: -1,
        }, {
          name: 'Perception',
          value: -1,
        }, {
          name: 'Charisme',
          value: -1,
        }, {
          name: 'Dextérité',
          value: -1,
        }],
        skills: [
          {
            name: 'Erudition',
          },
          {
            name: 'Connaisance Magique',
          }
        ]
      } as CharacterSheet
]
