import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, LoadingController, ToastController, MenuController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPage} from '../character-sheet/character-sheet.page';
import {File} from '@ionic-native/file/ngx';
import Peer from 'peerjs';
import { PlayersService } from '../../providers/players/players.service';
import { SelectCharacterPage } from '../select-character/select-character.page';
import { SimulateurPage } from '../simulateur/simulateur.page';
import {faDiceD20, faTable, faTrophy, faPeopleArrows, faCrown, faFeather} from '@fortawesome/free-solid-svg-icons';
import {AchivementService} from '../../providers/achivement/achivement.service';
import {NotesPage} from '../notes/notes.page';
import {NotesService} from '../../providers/notes/notes.service';
import { Player } from 'src/app/models/player.models';
import { AchivementPage } from '../achivement/achivement.page';
import {CanvasPage} from '../canvas/canvas.page';
import { Location } from '@angular/common';
import { CrowdsourcingPage } from '../crowdsourcing/crowdsourcing.page';
import { CharacterService } from 'src/app/providers/character/character.service';
import { Conversation } from 'src/app/models/conversation.model';
import { GeneratorChoicePage } from '../name-generator/generator-choice/generator-choice.page';

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})

export class SessionHomePage {

  // Personal info
  isHost: boolean;
  roomName: string;
  description: string;
  peer: Peer;
  myid: string;
  roomid: string;
  pseudo: string;
  // Host peerServer info
  host = '51.210.101.240';
  path = '/remus-app';
  port = 9000;
  // Other variables
  imgTemp = '';
  image: string = null;
  loader: any;
  diceIcon = faDiceD20;
  trophyIcon = faTrophy;
  crowdsourcing = faPeopleArrows;
  crown=faCrown;
  generator= faFeather;

  constructor(public achivementService: AchivementService, public modalCtr: ModalController, private route: ActivatedRoute, private router: Router,
              private alerteController: AlertController, private loadingController: LoadingController,
              private file: File, private playerServ: PlayersService,
              private toastController: ToastController, private menuController: MenuController,
              private noteService: NotesService, private location: Location,
              private characterService: CharacterService) {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.roomName = this.router.getCurrentNavigation().extras.state.name;
          this.description = this.router.getCurrentNavigation().extras.state.description;
          this.pseudo = this.router.getCurrentNavigation().extras.state.pseudo;
          this.roomid = this.router.getCurrentNavigation().extras.state.id;
        }
      });
    }

    this.menuController.enable(true, 'playerList');
    this.menuController.enable(false, 'mainMenu');

  }


  ngOnInit() {
    // initialise Peer
    this.myid = Math.random().toString(36).substr(2, 5); // Should be only for host
    this.peer = new Peer(this.myid,
      {host: this.host,
      path: this.path,
      port: this.port,
      debug: 2});

    if (!this.roomName) {
      // Peers trying to join
      this.roomName = 'Salle d\'attente';
      if (!this.roomid) {
        this.location.back();
      }


      this.peer.on('open', id => {
        this.makeLoader();
        // connect to host peer
        const conn = this.peer.connect(this.roomid, {serialization: 'json'});
        conn.on('open', () => {
          // informe player name
          conn.send({newPlayer: this.pseudo});
        });
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
      });

      this.peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
        conn.on('open', () => {
          console.log('opened connection with ', conn);
        });
      });

      this.peer.on('error', err => {
        console.log(err.type);
        if (err.type === 'peer-unavailable') {
          this.makeKickAlert('id ' + this.roomid + ' ne correspond a aucune salle.');
        }
      });

    } else {
      // Initialise hosting
      this.pseudo = 'Host';
      this.roomid = this.myid;
      this.playerServ.isHost = true;

      this.peer.on('open', id => {
        this.makeAnIdAlert(id);
        console.log('locked and loaded id: ', id);
      });

      this.peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          this.treatData(data, conn);
        });
        conn.on('open', () => {
          console.log('opened connection with ', conn);
        });
      });

    }
    this.playerServ.myPlayer.name = this.pseudo;
  }

  ionViewWillLeave() {
    this.playerServ.isHost=false;
    this.loader.dismiss()

    this.menuController.enable(false, 'playerList');
    this.menuController.enable(true, 'mainMenu');

    this.noteService.reset();

    this.playerServ.getConns().forEach(c => {
      if (!this.playerServ.isHost) {
        c.send({removed: this.pseudo});
      } else {
        c.send({kick: 'l\'hote à quité la partie'});
      }
      c.close();
    });

    const len = this.playerServ.playersList.length;
    for (let i = 0; i < len; i++) {
      this.playerServ.playersList.pop();
    }

    this.playerServ.resetPlayer();

    this.peer.disconnect();
    this.peer.destroy();
    // reset shared files
    if (this.file.listDir(this.file.dataDirectory , '')) {
      this.file.listDir(this.file.dataDirectory , '').then((listing) => {
        for (const files of listing) {
          if (files.isFile === true) {
            this.file.removeFile(this.file.dataDirectory, files.name);
            console.log('This is a file');
          }
        }
      });
    }

  }

  masterCharacterModal() {
    this.modalCtr.create({
      component: SelectCharacterPage,
      swipeToClose: true,
    }).then(modal => modal.present());
  }

  async openModal(page) {
    const modal = await this.modalCtr.create({
      component: (page === 'doc') ? DocPopupPage : CharacterSheetPage,
      componentProps: {
         charInd: -1,
      },
      // cssClass: 'custom-modal-css',
      swipeToClose: true,
      id: 'Character'
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        this.image = dataReturned.data;
        const navigationExtras: NavigationExtras = {
          state: dataReturned.data
        };
      }
    });

    return modal.present();
  }

  openDiceRollerModal() {
    this.modalCtr.create({
      component: SimulateurPage,
      swipeToClose: true,
      componentProps: {
        isModal: true // Adapt format for in-modal use
      },
    }).then(modal => {
      modal.present();
    });
  }

  openNotesModal() {
    this.modalCtr.create({
      component: NotesPage,
      swipeToClose: true,
    }).then(modal => {
      modal.present();
    });
  }

  async openAchivementModal() {
    const modal = await this.modalCtr.create({
      component: AchivementPage,
      componentProps: {
        charInd: -1,
      },
      swipeToClose: true,
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        const navigationExtras: NavigationExtras = {
          state: dataReturned.data
        };
      }
    });

    return await modal.present();
  }

  openCanvasModal() {
    this.modalCtr.create({
      component: CanvasPage,
      swipeToClose: true,
      componentProps: {
        image: this.image,
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then((data) => {
        this.image = data.data;
      });
    });
  }
  makeAnIdAlert(id) {
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
    });
  }

  makeApprovalAlert(player, conn) {
    this.alerteController.create({
      header: 'Nouveau joueur !',
      message: player,
      buttons: [
        {text: 'approuver', role: 'join', handler: () => {
            // Send old players info to new player
            this.playerServ.playersList.forEach( player => {
              conn.send({newPlayer: player.name, peer: player.conn.peer});
            });
            // Send new player info to old players
            this.playerServ.getConns().forEach( con => {
              con.send({newPlayer: player, peer: conn.peer});
            });
            conn.send({roomName: this.roomName, roomDesc: this.description});
            conn.send({template: this.characterService.getTemplate()});
            // Add new player to peronnal player list
            this.playerServ.playersList.push({name: player, conn});
        }},
        {text: 'refuser', role: 'kick', handler: () => {
        conn.send({kick: 'accès refusé'});
        }}]
    }).then(alert => {
      alert.present();
    });
  }

  makeKickAlert(reason) {
    this.loader.dismiss();
    this.alerteController.create({
      header: 'Vous avez été viré de la partie',
      message: 'Raison : ' + reason,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.location.back();
        }}]
    }).then(alert => {
      alert.present();
    });
  }

  async makeLoader() {
    this.loader = await this.loadingController.create({
      message: 'En attente de la réponse de l\'hote'
    });
    return this.loader.present();
  }

  openCrowdsouricngModal() {
    this.modalCtr.create({
      component: CrowdsourcingPage,
      componentProps: {
        modal: true
      }
    }).then(modal => {
      modal.present();
    });
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  treatData(data, conn = undefined) {
    // Treat given data
    if (data.roomName) {
      this.roomName = data.roomName;
      if (this.loader) {
        this.loader.dismiss();
      }
      this.playerServ.playersList.push({name: 'Host', conn});
    }
    if (data.roomDesc) {
      this.description = data.roomDesc;
    }
    if (data.newPlayer) {

      const node = document.createElement('ION-CARD');
      node.appendChild(document.createTextNode(data.newPlayer + ' a rejoint la salle'));
      document.getElementById('mainContent').appendChild(node);

      if (this.playerServ.isHost) {
        this.makeApprovalAlert(data.newPlayer, conn);
      } else {
        const con = this.peer.connect(data.peer, {serialization: 'json'});
        con.on('open', () => {
          // informe player name
          this.playerServ.playersList.push({name: data.newPlayer, conn: con});
          console.log('Openned connection with ', data.newPlayer);
        });
        con.on('data', (data) => {
          this.treatData(data, con);
        });
      }
    }
    if (data.kick) {
      this.makeKickAlert(data.kick);
    }
    if (data.imgPart) {
      this.imgTemp = this.imgTemp + data.imgPart;
    }
    if (data.imgEnd) {
      const p = this.playerServ.getPlayerById(conn.peer);
      this.imgTemp = this.imgTemp + data.imgEnd[1];
      this.file.createFile(this.file.dataDirectory, data.imgEnd[0], true).then();
      this.file.writeExistingFile(this.file.dataDirectory, data.imgEnd[0], this.imgTemp).then();
      this.imgTemp = '';
      this.toastController.create({
        position : 'top',
        duration: 3000,
        message: p.name + ' a partagé un nouveau document :\n' + data.imgEnd[0],
      }).then(toast => {toast.present(); });
    }
    if (data.removed) {
      const node = document.createElement('ION-CARD');
      node.appendChild(document.createTextNode(data.removed + ' a quitté la salle'));
      document.getElementById('mainContent').appendChild(node);
      // Notify players
      this.toastController.create({
        duration: 2000,
        message: data.removed + ' a quité la partie',
      }).then(toast => {toast.present(); });

      const player = this.playerServ.getPlayerByName(data.removed);
      const id = this.playerServ.playersList.indexOf(player)
      this.playerServ.playersList.splice(id, 1);
    }
    if (data.message) {
      let p: Player;
      p = this.playerServ.getPlayerById(conn.peer);
      console.log('recieved message : ', data.message, ' from ', p, ' directed to ', data.target);
        if(data.target)
            {if(data.target != 'Host')  this.playerServ.getConv(p).addMessage({timestamp: new Date(),player:p,message:data.message, target:this.playerServ.getPlayerByName(data.target)})}
        else
            {this.playerServ.getConv(p).addMessage({timestamp: new Date(),player:p,message:data.message, target:this.playerServ.me()})
            console.log("talkign me :", this.playerServ.me())
          }
        this.toastController.create({
        message: p.name + ' vous a envoyé une message :\n' + data.message,
        duration: 2000,
        position : 'top'
       }).then(toast => {toast.present(); });
    }
    if (data.achivement) {
      this.achivementService.achivements.push({titre: data.achivement, description: data.description, checked: false});
      this.achivementService.setUpAvancee();
    }
    if (data.achivementPartage !== undefined) {
      this.achivementService.partage = data.achivementPartage;
    }
    if (data.achivementValide) {
      this.achivementService.validAchivement(data.achivementValide);
      this.achivementService.setUpAvancee();
    }
    if (data.removeAchivement) {
      this.achivementService.remove(data.removeAchivement);
    }
    if (data.template) {
      this.characterService.setTemplate(data.template);
    }
  }

  navigateToChar() {
    this.router.navigate(['character-sheet']);
  }
  closeImage() {
    this.image = null;
  }

  openGeneratorChoiceModal() {
    this.modalCtr.create({
      component: GeneratorChoicePage
    }).then(m => m.present());
  }

}
