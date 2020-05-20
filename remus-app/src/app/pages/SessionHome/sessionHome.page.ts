import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})
export class SessionHomePage {

  roomName: string;
  description: string;

  constructor(public alertController: AlertController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roomName = this.router.getCurrentNavigation().extras.state.name;
        this.description = this.router.getCurrentNavigation().extras.state.description;
      }
    });
  }

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
