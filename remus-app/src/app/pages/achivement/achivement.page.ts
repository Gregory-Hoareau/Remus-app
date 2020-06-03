import { Component } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { Router, NavigationExtras } from '@angular/router';
import {JoinFormPage} from '../join-form/join-form.page';
import {Achivement} from "../../models/achivement.model";
import {AchivementService} from "../../providers/achivement/achivement.service";
import {PlayersService} from "../../providers/players/players.service";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Player} from "../../models/player.models";

@Component({
  selector: 'app-achivement',
  templateUrl: 'achivement.page.html',
  styleUrls: ['achivement.page.scss'],
})
export class AchivementPage {

  eye=faEye;
  achivements: Achivement[];
  players: Player[];

  constructor(private modalCtrl: ModalController, private playersService:PlayersService,private router: Router, private alertController: AlertController, private achivementService: AchivementService) {
    this.achivements = achivementService.achivements;
    this.players = playersService.playersList;
  }

  async showAchivement(achivement: Achivement) {
    const alert = await this.alertController.create({
      header: achivement.titre,
      message : achivement.description,
      buttons: [{
        text: 'Ok',
        role: 'Ok',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async newAchivement() {
    const alert = await this.alertController.create({
      header: 'Nouveau Succés',
      cssClass: 'custom-popup-css',
      message : 'Ajouter un titre et une description :',
      inputs: [{
        name: 'titre',
        type: 'text',
        placeholder: 'Titre'
      }, {
        name: 'description',
        type: 'text',
        placeholder: 'Description'
      }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'Confirm',
        handler: (data) => {
          this.achivementService.achivements.push({titre: data.titre, checked: false, description: data.description });
          this.playersService.playersList.forEach(p => {
            p.conn.send({achivement: data.titre, description: data.description });
          });
        }
      }
     ]
    });
    await alert.present();
  }

  validAchivement(titre:string) {
    this.achivementService.validAchivement(titre);
    this.playersService.playersList.forEach(p => {
      p.conn.send({achivementValide: titre});
    });
  }
  activatePartage() {
    this.achivementService.partage = !this.achivementService.partage;
    this.players.forEach(p => {
      p.conn.send({achivementPartage: true});
      console.log(this.achivementService.partage);
    });
  }

  desactivatePartage() {

    this.achivementService.partage = !this.achivementService.partage;
    this.players.forEach(p => {
      p.conn.send({achivementPartage: false});
      console.log(this.achivementService.partage);
    });
  }
}
