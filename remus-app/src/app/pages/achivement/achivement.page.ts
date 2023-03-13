import { Component } from '@angular/core';
import {AlertController, ModalController, IonItemSliding} from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { Router, NavigationExtras } from '@angular/router';
import {JoinFormPage} from '../join-form/join-form.page';
import {Achivement} from "../../models/achivement.model";
import {AchivementService} from "../../providers/achivement/achivement.service";
import {PlayersService} from "../../providers/players/players.service";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Player} from "../../models/player.models";
import {CharacterSheet} from "../../models/character-sheet.model";

@Component({
  selector: 'app-achivement',
  templateUrl: 'achivement.page.html',
  styleUrls: ['achivement.page.scss'],
})
export class AchivementPage {

  eye=faEye;
  achivements: Achivement[];
  players: Player[] =null;
  avancee = 1;
  private startOpen = false;
  private endOpen = false;

  constructor(public modalCtrl: ModalController, public playersService:PlayersService,private router: Router, private alertController: AlertController, public achivementService: AchivementService) {
    this.players =this.playersService.playersList;
    this.achivements = achivementService.achivements;
    this.achivementService.setUpAvancee();
    this.avancee = this.achivementService.avancee;
   
  }


  async showAchivement(achivement: Achivement, sliding?: IonItemSliding) {
    if(sliding){
      sliding.close();
    }
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
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'Confirmer',
        handler: (data) => {
          this.addAchivement(data);
        }
      }
     ]
    });
    await alert.present();
  }

  startClick(itemSliding: IonItemSliding, event) {
    event.stopPropagation();
    itemSliding.open('start');
  }

  endClick(itemSliding: IonItemSliding) {
    event.stopPropagation();
    itemSliding.open('end');
  }

  trash(achivement: Achivement) {
    this.achivements.splice(this.achivements.indexOf(achivement), 1);
    this.achivementService.setUpAvancee();
    this.avancee = this.achivementService.avancee;
    this.players.forEach(p => {
      p.conn.send({removeAchivement: achivement});
    });
  }

  addAchivement(data) {
    this.achivementService.addAchivement({titre: data.titre, checked: false, description: data.description });
    this.players.forEach(p => {
      p.conn.send({achivement: data.titre, description: data.description });
    });
    this.achivementService.setUpAvancee();
    this.avancee = this.achivementService.avancee;
  }

  validAchivement(titre:string) {
    this.achivementService.validAchivement(titre);
    this.players.forEach(p => {
      p.conn.send({achivementValide: titre});
    });
    this.achivementService.setUpAvancee();
    this.avancee = this.achivementService.avancee;
  }

  async activatePartage() {
    const alert = await this.alertController.create({
      cssClass: 'custom-popup-css',
      message : 'Vous êtes sur le point de partager les succés avec les autres joueurs. Voulez-vous continuer?',
      buttons: [{
        text: 'Non',
        role: 'non',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'Oui',
        handler: () => {
          this.achivementService.partage = !this.achivementService.partage;
          this.players.forEach(p => {
            p.conn.send({achivementPartage: true});
            console.log(this.achivementService.partage);
          });
        }
      }
      ]
    });
    await alert.present();
  }
  // bug connu : Le bouton ne fonctionne qu'une fois sur deux.
  async desactivatePartage() {

    const alert = await this.alertController.create({
      cssClass: 'custom-popup-css',
      message : 'Vous êtes sur le point de retier le partage des succés avec les autres joueurs. Voulez-vous continuer?',
      buttons: [{
        text: 'Non',
        role: 'non',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'Oui',
        handler: (data) => {
          this.achivementService.partage = !this.achivementService.partage;
          this.players.forEach(p => {
            p.conn.send({achivementPartage: false});
            console.log(this.achivementService.partage);
          });
        }
      }
      ]
    });
    await alert.present();
  }
}
