import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Player } from 'src/app/models/player.models';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playersList: Player[]

  constructor(private alertCtrl: AlertController) {
    this.playersList = []
  }


  kickAlert(player: Player) {
    this.alertCtrl.create({
      header: 'Voulez vraiment renvoyé ce joueur ?',
      message: 'Vous êtes sur le point de renvoyé "' + player.name + '". Êtes vous sûre de votre décission',
      buttons: [{
        text: 'Renvoyé',
        handler: () => {
          player.conn.send({kick: 'Le Mj fait ce qu\'il veut et vous l\'avait énervée'});
          const id = this.playersList.indexOf(player);
          console.log(id)
          this.playersList.splice(id, 1);
          console.log(this.playersList);
        }
      }, {
        text: 'Annuler',
        handler: () => {
        }
      }]
    }).then(alert => alert.present());
    
  }

  

}
