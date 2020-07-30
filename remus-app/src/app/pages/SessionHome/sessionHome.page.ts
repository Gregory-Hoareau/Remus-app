import { Component, ComponentFactoryResolver, ComponentRef, ComponentFactory, ViewChild, ViewContainerRef } from '@angular/core';
import {AlertController, ModalController, LoadingController, ToastController, MenuController} from '@ionic/angular';
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
import { InvitationSenderPage } from '../invitation-sender/invitation-sender.page';
import { Peer2peerService } from 'src/app/providers/peer2peer/peer2peer.service';
import { SharedFileComponent } from 'src/app/components/shared-file/shared-file.component';
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
  roomid: string;
  pseudo: string;
  // Host peerServer info
  host = '51.210.101.240';
  path = '/remus-app';
  port = 9000;
  // Other variables
  currentTimeout;
  imgTemp = '';
  loader: any;
  diceIcon = faDiceD20;
  trophyIcon = faTrophy;
  crowdsourcing = faPeopleArrows;
  crown=faCrown;
  generator= faFeather;


  @ViewChild('sharedfilecontainer', { read: ViewContainerRef, static:true }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver,public achivementService: AchivementService, public modalCtr: ModalController, private route: ActivatedRoute, private router: Router,
              private alerteController: AlertController, private loadingController: LoadingController,
              private file: File, private playerServ: PlayersService,
              private toastController: ToastController, private menuController: MenuController,
              private noteService: NotesService, private location: Location,
              private characterService: CharacterService, private peerService: Peer2peerService) {
    this.menuController.enable(true, 'playerList');
    this.menuController.enable(false, 'mainMenu');

  }


  ngOnInit() {
    //initialise variables.
    if (this.route.queryParams) {
      console.log(this.route.queryParams)
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.roomName = this.router.getCurrentNavigation().extras.state.name;
          this.description = this.router.getCurrentNavigation().extras.state.description;
          this.pseudo = this.router.getCurrentNavigation().extras.state.pseudo;
          this.roomid = this.router.getCurrentNavigation().extras.state.id;
        } else {
          this.location.back();
        }
      });
    } 

    // initialise Peer
    this.peer = this.peerService.newpeer(Math.random().toString(36).substr(2, 5));

    if(this.roomid || this.roomName){
      if (!this.roomName) {
        this.playerServ.isHost = false;
        // Peers trying to join
        this.roomName = 'Salle d\'attente';

        this.peerService.openPeer(
          function(params: SessionHomePage){
            // connect to host peer
            const conn = params.peerService.newConnection(params.roomid);
            params.peerService.openConnection(conn, (params)=>{
              params.breakTimeout();
              conn.send({newPlayer: params.pseudo});
            }, params);
            params.peerService.addConnectionAction(conn, (data, conn, params)=>{
              params.treatData(data,conn,params);
            }, params);
            params.peerService.closeConnection(conn, (params)=>{
              params.createDisconnectionTimeout("L'hôte à quité la partie.")
              params.playerServ.resetPlayer();
            }, params);
            params.createDisconnectionTimeout("Connection échoué. Veuillez réessayer.", 10000);
          },
          this
        );

        this.peerService.errorPeer('peer-unavailable', (params, err)=>{
          console.log("caught error", err);
          params.breakTimeout();
          params.makeKickAlert('id ' + params.roomid + ' ne correspond a aucune salle.');
        }, this);

      } else {
        // Initialise hosting
        this.pseudo = 'Host';
        this.roomid = this.peerService.myId();
        this.playerServ.isHost = true;

        this.peerService.openPeer((params) => {
          this.makeAnIdAlert(params);
        }, this.roomid);
      }

      this.peerService.connectPeer((conn, params) => {
        params.peerService.addConnectionAction(conn, (data, conn, params)=>{
          params.treatData(data,conn,params);
        }, params);
        params.peerService.openConnection(conn, (params)=>{
          console.log('opened connection with ', conn);
        });
        params.peerService.closeConnection(conn, (params)=>{
          const p:Player = params.playerServ.getPlayerById(conn.peer);

          params.createTicket(p.name + ' a quité la salle')
          // Notify players
          params.toastController.create({
            duration: 2000,
            message: p.name + ' a quité la salle',
            position: "top"
          }).then(toast => {toast.present(); });
    
          params.playerServ.removePlayer(p);
          console.log(p.name," has left.");
        }, params);
      }, this);

      this.playerServ.myPlayer.name = this.pseudo;
    }
  }

  ionViewWillLeave() {

    this.playerServ.isHost=false;

    this.menuController.enable(false, 'playerList');
    this.menuController.enable(true, 'mainMenu');

    this.noteService.reset();

    this.peerService.shutDown();
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
    this.breakTimeout();
  }

  createDisconnectionTimeout(reason: string, time = 5000){
    this.currentTimeout=setTimeout(() => {
      this.makeKickAlert(reason);
    }, time);
  }

  breakTimeout(){
    clearTimeout(this.currentTimeout);
  }

  createTicket(message:string) {
    const node = document.createElement('ION-CARD');
    node.appendChild(document.createTextNode(message));
    document.getElementById('mainContent').appendChild(node);
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
      if (dataReturned.data) {
        console.log(dataReturned.data);
        //this.entry.clear();
        const factory = this.resolver.resolveComponentFactory(SharedFileComponent);
        const componentRef = this.entry.createComponent(factory);
        componentRef.instance.image = dataReturned.data;
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

  sendInvitationModal() {
    this.modalCtr.create({
      component: InvitationSenderPage,
      componentProps: {
        roomId: this.roomid
      }
    }).then(m => m.present());
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
            this.createTicket(player + ' a rejoint la salle');
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

  treatData(data, conn = undefined) {
    // Treat given data
    if (data.roomName) {
      this.roomName = data.roomName;
      this.playerServ.playersList.push({name: 'Host', conn});
    }
    if (data.roomDesc) {
      this.description = data.roomDesc;
    }
    if (data.newPlayer) {
      if (this.playerServ.isHost) {
        this.makeApprovalAlert(data.newPlayer, conn);
      } else {
        const con = this.peerService.newConnection(data.peer);
        this.peerService.openConnection(con, (params) => {
          // informe player name
          this.playerServ.playersList.push({name: params.newPlayer, conn: con});
          console.log('Openned connection with ', params.newPlayer);
          this.createTicket(params.newPlayer + ' a rejoint la salle');
        }, data);
        this.peerService.addConnectionAction(conn, (data, conn, params)=>{
          params.treatData(data,conn,params);
        }, this);
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

  openGeneratorChoiceModal() {
    this.modalCtr.create({
      component: GeneratorChoicePage
    }).then(m => m.present());
  }

}
