import { Component, NgZone } from '@angular/core';

import {Platform, NavController, ModalController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NavigationExtras, Router} from '@angular/router';
import {faDiceD20, faHome, faPowerOff, faCommentAlt, faUserSlash, faPeopleArrows, faTrophy, faFeatherAlt, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {PlayersService} from './providers/players/players.service';
import { Player } from './models/player.models';
import { SessionChatPage } from './pages/session-chat/session-chat.page';
import {AchivementPage} from './pages/achivement/achivement.page';
import { Location } from '@angular/common';
import { Conversation } from './models/conversation.model';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { JoinFormPage } from './pages/join-form/join-form.page';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  achievmentIcon = faTrophy;
  powerIcon = faPowerOff;
  chatIcon = faCommentAlt;
  kickIcon = faUserSlash;

  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: faHome
    },
    {
      title: 'Simulateur',
      url: '/simulateur',
      icon: faDiceD20
    },
    {
      title: 'Communauté',
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
      private modalCtrl: ModalController,
      private location: Location,
      private zone: NgZone,
      private deeplinks: Deeplinks
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDeeplinks();
    });
  }

  setupDeeplinks() {
    this.deeplinks.route({
      '/join/:roomId': 'join',
    }).subscribe(match => {
      switch(match.$route) {
        case 'join':
          this.zone.run(()=> {
            this.handleJoinDeeplink(match.$args.roomId)
          })
          break;
        default:
          break;
      }
    })
  }

  private async handleJoinDeeplink(roomId) {
    const modal = await this.modalCtrl.create({
      component: JoinFormPage,
      componentProps: {
        id: roomId
      }
    })
    modal.present();
  }

  kick(player: Player) {
    this.playersServ.kickAlert(player);
  }

  quit() {
    this.location.back();
  }

  async openAchivementModal() {
    const modal = await this.modalCtrl.create({
      component: AchivementPage,
      componentProps: {
        charInd: -1,
      },
      cssClass: 'custom-modal-css',
      swipeToClose: true,
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        const navigationExtras: NavigationExtras = {
          state: dataReturned.data
        };
        this.location.back();
      }
    });

    return modal.present();
  }

  openChat(target: Player = {name: 'all', conn:undefined}, player: Player = this.playersServ.me()) {
    console.log('CLICKED ON ', target);
    if (!this.playersServ.conversations.get(player)) {
      this.playersServ.conversations.set(player, new Conversation());
    }
    this.modalCtrl.create({
      component: SessionChatPage,
      swipeToClose: true,
      componentProps: {
        target:target,
        player:player
      }
    }).then(modal => {
      modal.present();
    });
  }
}
