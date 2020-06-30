import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { Trait } from 'src/app/models/trait.model';
import { CharacterService } from 'src/app/providers/character/character.service';
import { NavigationExtras, Router } from '@angular/router';

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

  constructor(private modalController: ModalController, private alertController: AlertController,
              private characterService: CharacterService, private router: Router) { }

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
            this.sheet.other_personal.push({
              name: data.data,
              value: ''
            })
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

  finishCustomisation() {
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
      subHeader: 'Une fois cela fait vous ne pourrez plus la modifier, êtes vous sur de vouloir sauvegarder ?',
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
