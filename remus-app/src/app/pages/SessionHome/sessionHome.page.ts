import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPage} from '../character-sheet/character-sheet.page';
import {File} from '@ionic-native/file/ngx';
import Peer from 'peerjs';
import { PlayersService } from "../../providers/players/players.service";

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})

export class SessionHomePage {

  host: boolean;
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

  constructor(public modalCtr: ModalController, private route: ActivatedRoute, private router: Router,
              private alerteController: AlertController,
              private file: File, private navCtrl: NavController,private playerServ: PlayersService) {
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
    this.peer = new Peer(this.myid, {host: '127.0.0.1', path: '/remus-app' , port: 9000, debug: 3});


    if (this.pseudo) {
      console.log('trying to connect to room ', this.roomid);
      this.peer.on('open', id => {

      });
      var conn = this.peer.connect(this.roomid);
      conn.on('open', () => {
        console.log('connection openned to id ', conn.peer);
        conn.send({newPlayer: this.pseudo});
      })
      conn.on('data', (data) => {
        this.treatData(data, conn);
      });
      this.conns.push(conn);

    } else {
      this.host = true;
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

  async openModal(page) {
    const modal = await this.modalCtr.create({
      component: (page === 'doc') ? DocPopupPage : CharacterSheetPage,
      cssClass: 'custom-modal-css',
      swipeToClose: true
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        this.dataReturned = dataReturned.data;
        this.image = this.dataReturned;
        const navigationExtras: NavigationExtras = {
          state: this.dataReturned
        };
        this.router.navigate(['sessionHome'], navigationExtras);
      }
    });

    return await modal.present();
  }

  async makeAnIdAlert(id) {
    const alert = await this.alerteController.create({
      header: 'Nouvelle partie !',
      message: id,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async makeApprovalAlert(player, conn) {
    const alert = await this.alerteController.create({
      header: 'Nouveau joueur !',
      message: player,
      buttons: [
        {text: 'approuver', role:'join', handler: ()=>{
          this.players.push(player);
            this.playerServ.playersList.push(player)
            if(this.host)
            conn.send({roomName:this.roomName,roomDesc:this.description});
            this.conns.forEach(conn => {
              conn.send({newPlayer:player})
            });
        }}, 
        {text: 'refuser', role: 'kick', handler: ()=>{
        conn.send({kick:'accès refusé'})
        }}]
    });
    await alert.present();
  }

  async makeKickAlert(reason) {
    const alert = await this.alerteController.create({
      header: 'Vous avez été viré de la partie',
      message: 'raison : '+reason,
      buttons: [{
        text:'Ok',
        handler: ()=>{
          this.peer.disconnect();
          this.peer.destroy();
          this.navCtrl.navigateBack(['/home']);
        }}]
    });
    await alert.present();
  }

  treatData(data, conn=undefined){
    if(data.roomName)
      this.roomName=data.roomName;
    if(data.roomDesc)
      this.description=data.roomDesc;
    if(data.newPlayer)
      {
        if(this.host)
          this.makeApprovalAlert(data.newPlayer,conn)
        else
          this.players.push(data.newPlayer);
      }
    if(data.kick)
      this.makeKickAlert(data.kick);
    }

    navigateToChar() {
    this.router.navigate(['character-sheet']);
  }
  closeImage() {
    this.image = null;
  }

}
