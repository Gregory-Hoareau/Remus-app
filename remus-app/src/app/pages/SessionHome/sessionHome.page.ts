import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import Peer from 'peerjs';

@Component({
  selector: 'app-home',
  templateUrl: 'sessionHome.page.html',
  styleUrls: ['sessionHome.page.scss'],
})

export class SessionHomePage {

  dataReturned: any;
  roomName: string;
  description: string;
  peer: Peer;
  id: string;
  conn: any;
  players: [];

  constructor(public modalCtr: ModalController,
              private route: ActivatedRoute, private router: Router, private routerOutlet: IonRouterOutlet) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roomName = this.router.getCurrentNavigation().extras.state.name;
        this.description = this.router.getCurrentNavigation().extras.state.description;
        this.id = this.router.getCurrentNavigation().extras.state.password;
      }
    });
    this.players=[]
  }

  ngOnInit(){
    this.peer = new Peer(Math.random().toString(36).substr(2, 4),{host: '127.0.0.1',path:'/myapp' ,port:9000,debug: 3});



    if(this.id!==""){
      console.log('trying to connect to ', this.id);
      this.peer.on('open', id => {
        console.log("openned with id ", id);
      })
      this.conn = this.peer.connect(this.id);
      this.conn.on('open', () => {
        console.log("connection openned to id ", this.conn.peer);
        this.conn.send({newPlayer:this.roomName});
        this.roomName="hello there"
      })
      this.conn.on('data', (data) => {
        this.treatData(data);
      });

    }else{
      console.log('trying to open');
      this.peer.on('open', id=> {
        console.log('locked and loaded id: ', id);
      })
      this.peer.on('connection', (conn) => {
        this.conn=conn;
        console.log('connection with ', this.conn.peer);
        conn.on('data', (data) => {
          // Will print 'hi!'
          this.treatData(data);
          this.conn.send({roomName:this.roomName,roomDesc:this.description});
        });
        this.conn.on('open', () => {
          console.log('opened connection');
        });
        this.conn.send('hello!');
      });
    }
  }

  async openModal() {
    const modal = await this.modalCtr.create({
      component: DocPopupPage,
      presentingElement: this.routerOutlet.nativeEl,
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


  treatData(data){
    if(data.roomName)
      this.roomName=data.roomName;
    if(data.roomDesc)
      this.description=data.roomDesc;
    if(data.newPlayer)
      {
        this.players.push(data.newPlayer);
      }
    
  }

}
