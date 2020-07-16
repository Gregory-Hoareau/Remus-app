import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Player } from 'src/app/models/player.models';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Conversation } from 'src/app/models/conversation.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  // tslint:disable-next-line:ban-types
  playersList: Player[];
  conversations: Map<Player, Conversation>;
  myPlayer: Player;

  isHost: boolean;

  constructor(private alertCtrl: AlertController) {
    this.playersList = [];
    this.conversations = new Map<Player, Conversation>();
    this.myPlayer = {name: '', conn: undefined} as Player;
  }

  resetPlayer(){
    this.playersList.forEach(() => {
      this.playersList.pop();
    });
  }

  removePlayer(player: Player) {
    const id = this.playersList.indexOf(player);
    this.playersList.splice(id, 1);
  }

  kickAlert(player: Player) {
    this.alertCtrl.create({
      header: 'Voulez-vous vraiment renvoyer ce joueur ?',
      message: 'Vous êtes sur le point de renvoyé "' + player.name + '". Êtes vous sûre de votre décision ?',
      inputs: [
        {
          type:'text',
          name:'reason',
          value:'Le Mj fait ce qu\'il veut et vous l\'avez énervé'
        }
      ],
      buttons: [{
        text: 'Renvoyer',
        handler: data => {
          player.conn.send({kick: data.reason});
          player.conn.close()
          this.removePlayer(player)
          this.playersList.forEach(p => {
            p.conn.send({removed: player.name});
          });
          console.log(this.playersList);
        }
      }, {
        text: 'Annuler'
      }]
    }).then(alert => alert.present());
    
  }

  getPlayerByName(name: string): Player {
    let player: Player;
    this.playersList.forEach(p => {
      console.log(p.name, " is ? ", name)
      if(p.name === name)
        player=p;
    });
    return player;
  }

  getPlayerById(id: string): Player {
    let player: Player;
    this.playersList.forEach(p => {
      console.log(p.conn.peer)
      if(p.conn.peer == id){
        player=p;
      }
    });
    return player;
  }

  getConns() {
    var conns: any[] = [];
    this.playersList.forEach(player => {
      conns.push(player.conn);
    });
    return conns;
  }
  
  me() {
    return this.myPlayer;
  }

  getConv(player:Player) {
    if (!this.conversations.get(player))
      this.conversations.set(player, new Conversation());
    return this.conversations.get(player)
  }
}
