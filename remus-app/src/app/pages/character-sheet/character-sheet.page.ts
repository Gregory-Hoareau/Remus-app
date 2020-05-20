import { Component, OnInit } from '@angular/core';
import {CharacterSheet} from '../../models/character-sheet.model';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.page.html',
  styleUrls: ['./character-sheet.page.scss'],
})
export class CharacterSheetPage implements OnInit {

  character: CharacterSheet = {
    img: null,
    name: 'Eude',
    age: 18,
    sex: 'Homme',
    background: 'Aventurier noble',
    traits: [{
      name: 'Force',
      value: 6,
    }, {
      name: 'Endurance',
      value: 12,
    }, {
      name: 'Intelligence',
      value: 10,
    }, {
      name: 'Perception',
      value: 12,
    }, {
      name: 'Charisme',
      value: 8,
    }, {
      name: 'Dextérité',
      value: 18,
    }],
    skills: [
        'Conduite',
        'Instinct animal',
        'Bagarre'
    ]
  };

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async editPersonalAlert(title) {
    let field;
    switch (title) {
      case 'background': field = 'textarea'; break;
      case 'age': field = 'number'; break;
      default: field = 'text'; break;
    }
    const alert = await this.alertCtrl.create({
      header: title.charAt(0).toUpperCase() + title.slice(1),
      inputs: [{
        name: title,
        type: field,
        placeholder: title,
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data[title] !== '') {
            if (field === 'number') {
              data[title] = data[title] as number;
            }
            this.character[title] = data[title];
          }
        },
      }, {
        text: 'Annuler',
        handler: () => {
          console.log('Action cancel');
        }
      }],
    });

    await alert.present();
  }

  async editTraitAlert(title) {
    const alert = await this.alertCtrl.create({
      header: title.charAt(0).toUpperCase() + title.slice(1),
      inputs: [{
        name: title,
        type: 'number',
        placeholder: title,
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data[title] !== '') {
            const allTrait = this.character.traits;
            for (const t of allTrait) {
              if (t.name === title) {
                t.value = data[title];
              }
            }
          }
        },
      }, {
        text: 'Annuler',
        handler: () => {
          console.log('Action cancel');
        }
      }],
    });

    await alert.present();
  }

  deleteSkill(index) {
    this.character.skills.splice(index, 1);

  }

  async addNewSkillAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nouvelle Compétence',
      inputs: [{
        name: 'skill',
        type: 'text',
        placeholder: 'Nom Compétence',
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data.skill !== '') {
            this.character.skills.push(data.skill);
          }
        }
      }]
    });
    await alert.present();
  }


}
