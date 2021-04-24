import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { Trait } from 'src/app/models/trait.model';
import { CharacterService } from 'src/app/providers/character/character.service';
import { NavigationExtras, Router } from '@angular/router';
import { CrowdsourcingService } from 'src/app/providers/crowdsourcing/crowdsourcing.service';

@Component({
  selector: 'app-custom-sheet',
  templateUrl: './custom-sheet.page.html',
  styleUrls: ['./custom-sheet.page.scss'],
})
export class CustomSheetPage implements OnInit {

  @Input()
  sheet: CharacterSheet;

  @Input()
  dataReturned: any;

  private tagInputs;
  selectedTags: string[] = [];

  constructor(private modalController: ModalController, private alertController: AlertController,
              private characterService: CharacterService, private router: Router,
              private crowdsourcingService: CrowdsourcingService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss(undefined, 'cancel')
  }

  async addPersonalData() {
    const alert = await this.alertController.create({
      header: 'Ajout de données d\'identité',
      inputs: [{
        name: 'data',
        type: 'text',
        placeholder: 'Nom'
      }],
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Ajouter',
        handler: (data) => {
          if(data.data) {
            this.sheet.other_personal.push(new Trait(data.data))
          }
        }
      }]
    });

    alert.present();
  }

  async addTrait() {
    const alert = await this.alertController.create({
      header: 'Ajout de données d\'identité',
      inputs: [{
        name: 'trait',
        type: 'text',
        placeholder: 'Nom de caractéristique'
      }],
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Ajouter',
        handler: (data) => {
          if(data.trait) {
            this.sheet.traits.push(new Trait(data.trait))
          }
        }
      }]
    });

    alert.present();
  }

  createInputs() {
    const res = [];
    const tags = this.crowdsourcingService.getAvailableTags();
    for(const tag of tags) {
      console.log(tag)
      res.push({
        value: tag,
        label: tag,
        type: 'checkbox',
        checked: this.selectedTags.includes(tag)
      })
    }
    return res;
  }

  async addTags() {
    this.tagInputs = this.createInputs();
    const tagAlert = await this.alertController.create({
      header: 'Ajout de tag',
      inputs: this.tagInputs,
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Confirmer',
        handler: (data) => {
          if(data.length !== 0) {
            this.selectedTags = data;
          }
        }
      }]
    });

    tagAlert.present();
  }

  removeTag(tag) {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1)
  }

  private stringfySelectedTag() {
    let res = '';
    for(const tag of this.selectedTags) {
      res += tag + ',';
    }
    return res;
  }

  finishCustomisation() {
    this.sheet.tags = this.stringfySelectedTag();
    this.characterService.setCustomSheet(this.sheet);
    const extras: NavigationExtras = {
      state: this.dataReturned
    };
    this.router.navigate(['sessionHome'], extras);
    this.modalController.dismiss();
  }

  async finishCustomisationAlert() {
    const alert = await this.alertController.create({
      header: 'Vous êtes sur le point sauvegarder votre feuille de personnage.',
      subHeader: 'Une fois cela fait vous ne pourrez plus la modifier, êtes-vous sur de vouloir sauvegarder ?',
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Sauvegarder',
        handler: () => {
          this.finishCustomisation();
        }
      }]
    });

    alert.present()
  }

}
