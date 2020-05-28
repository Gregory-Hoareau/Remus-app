import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, LoadingController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPage} from '../character-sheet/character-sheet.page';
import {File} from '@ionic-native/file/ngx';
import Peer from 'peerjs';
import { PlayersService } from '../../providers/players/players.service';
import { SelectCharacterPage } from '../select-character/select-character.page';

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})

export class SessionHomePage {

  isHost: boolean;
  dataReturned: any;
  roomName: string;
  description: string;
  peer: Peer;
  myid: string;
  roomid: string;
  pseudo: string;
  conns: any[];
  players: any[];
  image: string = null;
  host = '51.210.101.240';
  path = '/remus-app';
  port = 9000;
  imgTemp = '';
  conn: any;
  loader: any;

  constructor(public modalCtr: ModalController, private route: ActivatedRoute, private router: Router,
              private alerteController: AlertController, private loadingController: LoadingController,
              private file: File, private navCtrl: NavController, private playerServ: PlayersService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roomName = this.router.getCurrentNavigation().extras.state.name;
        this.description = this.router.getCurrentNavigation().extras.state.description;
        this.pseudo = this.router.getCurrentNavigation().extras.state.pseudo;
        this.roomid = this.router.getCurrentNavigation().extras.state.id;
      }
    });
    this.players = [];
    this.conns = [];

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.myid = Math.random().toString(36).substr(2, 4);
    this.peer = new Peer(this.myid,
      {host: this.host,
      path: this.path,
      port: this.port,
      debug: 3});


    if (!this.roomName) {
      this.roomName='Salle d\'attente';
      if(!this.roomid)
        this.navCtrl.navigateBack(['/home']);
      console.log('trying to connect to room ', this.roomid);
      this.peer.on('open', id => {
        console.log('opened on ip ', this.host);
        // tslint:disable-next-line:prefer-const
        let conn = this.peer.connect(this.roomid, {serialization: 'json'});
        conn.on('open', () => {
          console.log('connection openned to id ', conn.peer);
          conn.send({newPlayer: this.pseudo});
          this.conns.push(conn);
        });
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
        console.log('conection status : ', conn.open);
      });
      this.peer.on('error', err => {
        console.log(err.type);
        if (err.type === 'peer-unavailable') {
          this.makeKickAlert('id ' + this.roomid +' ne correspond a aucune salle.');
        }
      });
    } else {
      this.isHost = true;
      console.log('trying to open');
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
        this.conns.push(conn);
      });
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.peer.disconnect();
    this.peer.destroy();
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
         connList : this.conns,
         charInd: -1,
      },
      cssClass: 'custom-modal-css',
      swipeToClose: true,
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        this.dataReturned = dataReturned.data;
        this.image = this.dataReturned;
        const navigationExtras: NavigationExtras = {
          state: this.dataReturned
        };
      }
    });

    return await modal.present();
  }

  async makeAnIdAlert(id) {
    const title = 'Nouvelle partie !';
    const alert = await this.alerteController.create({
      header: title,
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
    });
    await alert.present();
  }

  async makeApprovalAlert(player, conn) {
    const alert = await this.alerteController.create({
      header: 'Nouveau joueur !',
      message: player,
      buttons: [
        {text: 'approuver', role: 'join', handler: () => {
          this.players.push(player);
          this.playerServ.playersList.push({name: player, conn: conn});
          if (this.isHost) {
            conn.send({roomName: this.roomName, roomDesc: this.description});
          }
            // tslint:disable-next-line:no-shadowed-variable
          this.conns.forEach( conn => {
              conn.send({newPlayer: player});
            });
        }},
        {text: 'refuser', role: 'kick', handler: () => {
        conn.send({kick: 'accès refusé'});
        }}]
    });
    await alert.present();
  }

  async makeKickAlert(reason) {
    const alert = await this.alerteController.create({
      header: 'Vous avez été viré de la partie',
      message: 'raison : ' + reason,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateBack(['/home']);
        }}]
    });
    await alert.present();
  }

  async makeLoader(room) {
    this.loader = await this.loadingController.create({
      message: 'En attente de la réponse de l\'hote pour rejoindre la sale ' + room
    });
    this.loader.present();
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  treatData(data, conn = undefined) {
    if (data.roomName) {
      this.roomName = data.roomName;
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
          this.players.push(data.newPlayer);
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
