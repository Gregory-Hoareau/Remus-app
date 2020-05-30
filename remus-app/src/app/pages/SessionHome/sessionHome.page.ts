import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, LoadingController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPage} from '../character-sheet/character-sheet.page';
import {File} from '@ionic-native/file/ngx';
import Peer from 'peerjs';
import { PlayersService } from '../../providers/players/players.service';
import { SelectCharacterPage } from '../select-character/select-character.page';
import { SimulateurPage } from '../simulateur/simulateur.page';
import {faDiceD20} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})

export class SessionHomePage {

  //Personal info
  isHost: boolean;
  roomName: string;
  description: string;
  peer: Peer;
  myid: string;
  roomid: string;
  pseudo: string;
  //Host peerServer info
  host = '51.210.101.240';
  path = '/remus-app';
  port = 9000;
  //Other variables
  imgTemp = '';
  image: string = null;
  conn: any;
  loader: any;
  //???
  diceIcon = faDiceD20;

  constructor(public modalCtr: ModalController, private route: ActivatedRoute, private router: Router,
              private alerteController: AlertController, private loadingController: LoadingController,
              private file: File, private navCtrl: NavController, private playerServ: PlayersService) {
    if(this.route.queryParams){
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.roomName = this.router.getCurrentNavigation().extras.state.name;
          this.description = this.router.getCurrentNavigation().extras.state.description;
          this.pseudo = this.router.getCurrentNavigation().extras.state.pseudo;
          this.roomid = this.router.getCurrentNavigation().extras.state.id;
        }
      });
    }

  }


  ngOnInit() {
    //initialise Peer
    this.myid = Math.random().toString(36).substr(2, 4); //Should be only for host
    this.peer = new Peer(this.myid,
      {host: this.host,
      path: this.path,
      port: this.port,
      debug: 3});


    if (!this.roomName) {
      //Peers trying to join
      this.roomName='Salle d\'attente';
      if(!this.roomid)
        this.navCtrl.navigateBack(['/home']);
      
      this.peer.on('open', id => {
        //connect to host peer
        let conn = this.peer.connect(this.roomid, {serialization: 'json'});
        conn.on('open', () => {
          //informe player name
          conn.send({newPlayer: this.pseudo});
        });
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
      });

      this.peer.on('error', err => {
        console.log(err.type);
        if (err.type === 'peer-unavailable') {
          this.makeKickAlert('id ' + this.roomid +' ne correspond a aucune salle.');
        }
      });

    } else {
      //Initialise hosting
      this.isHost = true;
      this.roomid = this.myid;
      this.playerServ.isHost = true;

      this.peer.on('open', id => {
        this.makeAnIdAlert(id);
        console.log('locked and loaded id: ', id);
      });

      this.peer.on('connection', (conn) => {
        console.log('connection with ', conn.peer);
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
        conn.on('open', () => {
          console.log('opened connection');
        });
      });

    }
  }

  ngOnDestroy() {

    this.peer.disconnect();
    this.peer.destroy();
    //reset shared files
    this.file.listDir(this.file.dataDirectory , '').then((listing) => {
      for (const files of listing) {
        if (files.isFile === true) {
          this.file.removeFile(this.file.dataDirectory, files.name);
          console.log('This is a file');
        }
      }
    });

  }

  masterCharacterModal() {
    this.modalCtr.create({
      component: SelectCharacterPage,
      swipeToClose: true,
    }).then(modal => modal.present())
  }

  async openModal(page) {
    const modal = await this.modalCtr.create({
      component: (page === 'doc') ? DocPopupPage : CharacterSheetPage,
      componentProps: {
         connList : this.getConns(),
         charInd: -1,
      },
      cssClass: 'custom-modal-css',
      swipeToClose: true,
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        this.image = dataReturned.data;
        const navigationExtras: NavigationExtras = {
          state: dataReturned.data
        };
      }
    });

    return await modal.present();
  }

  //Return the connections to the players in table
  getConns(){
    var conns: any[] = [];
    this.playerServ.playersList.forEach(player => {
      conns.push(player.conn);
    });
    return conns;
  }


  openDiceRollerModal() {
    this.modalCtr.create({
      component: SimulateurPage,
      swipeToClose: true,
      componentProps: {
        isModal: true //Adapt format for in-modal use
     },
    }).then(modal => {
      modal.present();
    })
  }

  async makeAnIdAlert(id) {
    this.alerteController.create({
      header: 'Nouvelle partie !',
      message: id,
      cssClass: 'new_id',
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
          cssClass: 'buttons',
          handler: () => {
          }
        }
      ]
    }).then(alert => {
      alert.present();
    })
  }

  async makeApprovalAlert(player, conn) {
    this.alerteController.create({
      header: 'Nouveau joueur !',
      message: player,
      buttons: [
        {text: 'approuver', role: 'join', handler: () => {
            //Send new player info to old players
            this.getConns().forEach( con => {
              con.send({newPlayer: player, peer: conn.peer});
            });
            conn.send({roomName: this.roomName, roomDesc: this.description});
            //Add new player to peronnal player list
            this.playerServ.playersList.push({name: player, conn: conn});
            //Send old players info to new player
            this.playerServ.playersList.forEach( player => {
              conn.send({newPlayer: player.name, peer: player.conn.peer});
            });
        }},
        {text: 'refuser', role: 'kick', handler: () => {
        conn.send({kick: 'accès refusé'});
        }}]
    }).then(alert => {
      alert.present();
    })
  }

  async makeKickAlert(reason) {
    this.alerteController.create({
      header: 'Vous avez été viré de la partie',
      message: 'raison : ' + reason,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateBack(['/home']);
        }}]
    }).then(alert => {
      alert.present();
    })
  }

  async makeLoader(room) {
    this.loader = await this.loadingController.create({
      message: 'En attente de la réponse de l\'hote pour rejoindre la sale ' + room
    });
    this.loader.present();
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  treatData(data, conn = undefined) {
    //Treat given data
    if (data.roomName) {
      this.roomName = data.roomName;
      if(this.loader)
        this.loader.dismiss();
    }
    if (data.roomDesc) {
      this.description = data.roomDesc;
    }
    if (data.newPlayer) {
        if (this.isHost) {
          conn.send({wait: this.roomName});
          this.makeApprovalAlert(data.newPlayer, conn);
        } else {
          this.playerServ.playersList.push({name: data.newPlayer, conn: this.peer.connect(data.peer, {serialization: 'json'}) });
        }
      }
    if (data.kick) {
      this.makeKickAlert(data.kick);
    }
    if (data.imgPart) {
      this.imgTemp = this.imgTemp + data.imgPart;

    }
    if (data.imgEnd) {
      this.imgTemp = this.imgTemp + data.imgEnd[1];
      this.file.createFile(this.file.dataDirectory, data.imgEnd[0], true).then();
      this.file.writeExistingFile(this.file.dataDirectory, data.imgEnd[0], this.imgTemp).then();
      this.imgTemp = '';
    }
    if (data.wait) {
      this.makeLoader(data.wait);
    }
  }

  navigateToChar() {
    this.router.navigate(['character-sheet']);
  }
  closeImage() {
    this.image = null;
  }

}
