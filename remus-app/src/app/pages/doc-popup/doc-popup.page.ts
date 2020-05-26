import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertController, ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-doc-popup',
  templateUrl: './doc-popup.page.html',
  styleUrls: ['./doc-popup.page.scss'],
})
export class DocPopupPage implements OnInit {

  private items = [];
  

  constructor(private formBuilder: FormBuilder, private alertController: AlertController,
              private modalController: ModalController,
              private navParams: NavParams) {}

  ngOnInit() {
  }


  async closeModal() {
    await this.modalController.dismiss();
  }

  async itemSelected(item) {

  }
  async shareDoc() {
    const alert = await this.alertController.create({
      header: 'Ajouter un document :',
      buttons: [
        {
          text: 'Valider',
          role: 'Valider',
          cssClass: 'buttons',
          handler: (data) => {
            this.items.push(data.input);
          }
        }, {
          cssClass: 'buttons',
          text: 'Annuler',
          handler: () => {
            console.log('Annuler');
          }
        }
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'input'
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
