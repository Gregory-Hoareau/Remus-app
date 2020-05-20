import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})
export class SessionHomePage {

  constructor(public alertController: AlertController) {}

  async presentAlertConfirm() {
    const input = {data: []};
    for (let i = 1; i < 21; i++) {
      input.data.push({name: 'docs ' + i, type: 'radio', label: 'Document ' + i, value: 'value' + i});
    }
    const alert = await this.alertController.create({
      header: 'Documents partagés',
      message: 'Message <strong>text</strong>!!!',
      cssClass: '',
      inputs: input.data,
      buttons: [
        {
          text: 'Valider',
          role: 'Valider',
          cssClass: 'buttons',
          handler: () => {
            console.log('Valider');
          }
        }, {
          cssClass: 'buttons',
          text: 'Annuler',
          handler: () => {
            console.log('Annuler');
          }
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
