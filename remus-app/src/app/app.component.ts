import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NavigationExtras, Router} from '@angular/router';
import {faDiceD20, faHome, faPowerOff, faCommentAlt, faUserSlash, faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
import {PlayersService} from "./providers/players/players.service";
import { Player } from './models/player.models';
import { SessionChatPage } from './pages/session-chat/session-chat.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  players: Player[];
  powerIcon = faPowerOff;
  chatIcon = faCommentAlt;
  kickIcon = faUserSlash;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: faHome
    },
    {
      title: 'Simulateur',
      url: '/simulateur',
      icon: faDiceD20
    },
    {
      title: 'Crowdsourcing',
      url: '/crowdsourcing',
      icon: faPeopleArrows
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private playersServ: PlayersService,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {
    this.players = this.playersServ.playersList
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  kick(player: Player) {
    this.playersServ.kickAlert(player);
    this.players = this.playersServ.playersList
  }

  openChat(player: Player) {
    console.log("CLICKED ON ", player)
    if (!this.playersServ.conversations.get(player))
      this.playersServ.conversations.set(player,{messages:[]})
    this.modalController.create({
      component: SessionChatPage,
      swipeToClose: true,
      componentProps: {
        player: player,
        conv: this.playersServ.conversations.get(player)
      }
    }).then(modal => {
      modal.present()
    });
  }

  quit() {
    this.navCtrl.navigateBack(['/home'])
  }

}
