import { Component } from '@angular/core';
import {AlertController, IonRouterOutlet, ModalController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import Peer from 'peerjs';

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

  constructor(public modalCtr: ModalController, private route: ActivatedRoute, private router: Router, private alerteController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roomName = this.router.getCurrentNavigation().extras.state.name;
        this.description = this.router.getCurrentNavigation().extras.state.description;
        this.pseudo = this.router.getCurrentNavigation().extras.state.pseudo;
        this.roomid = this.router.getCurrentNavigation().extras.state.id;
      }
    });
    this.players=[]
    this.conns=[]
  }

  ngOnInit(){
    this.myid = Math.random().toString(36).substr(2, 4)
    this.peer = new Peer(this.myid,{host: '127.0.0.1',path:'/remus-app' ,port:9000,debug: 3});


    if(this.pseudo){
      console.log('trying to connect to room ', this.roomid);
      this.peer.on('open', id => {

      });
      var conn = this.peer.connect(this.roomid);
      conn.on('open', () => {
        console.log("connection openned to id ", conn.peer);
        conn.send({newPlayer: this.pseudo});
        this.roomName="hello there"
      })
      conn.on('data', (data) => {
        this.treatData(data);
      });
      this.conns.push(conn);

    } else{
      this.host=true;
      console.log('trying to open');
      this.peer.on('open', id => {
        this.makeAnIdAlert(id);
        console.log('locked and loaded id: ', id);
      })
      this.peer.on('connection', (conn) => {
        console.log('connection with ', conn.peer);
        conn.on('data', (data) => {
          // Will print 'hi!'
          this.treatData(data);
          conn.send({roomName:this.roomName,roomDesc:this.description});
        });
        conn.on('open', () => {
          console.log('opened connection');
        });
        this.conns.push(conn)
      });
    }
  }

  async openModal() {
    const modal = await this.modalCtr.create({
      component: DocPopupPage,
      //presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
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

  treatData(data){
    if(data.roomName)
      this.roomName=data.roomName;
    if(data.roomDesc)
      this.description=data.roomDesc;
    if(data.newPlayer)
      {
        this.players.push(data.newPlayer);
        if(this.host)
          this.conns.forEach(conn => {
            conn.send(data)
          });
      }
    }

  navigateToChar() {
    this.router.navigate(['character-sheet'])
  }

}
