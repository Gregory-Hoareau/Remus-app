import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { IonRouterOutlet } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {JoinFormPage} from '../join-form/join-form.page';
import { PlayersService } from 'src/app/providers/players/players.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataReturned: any;

  constructor(private router: Router, private modalCtr: ModalController, private playerServ:PlayersService) {

  }


  async joinModal() {
    const joiningmodal = await this.modalCtr.create({
      component: JoinFormPage,
      swipeToClose: true
    });

    joiningmodal.onWillDismiss().then((dataReturned) => {
      console.table(dataReturned);
      if (dataReturned.data !== undefined) {
        this.dataReturned = dataReturned.data;
        const navigationExtras: NavigationExtras = {
          state: this.dataReturned
        };
        this.router.navigate(['sessionHome'], navigationExtras);
      }
    });

    return await joiningmodal.present();
  }

  async openModal() {
    const modal = await this.modalCtr.create({
      component: HostFormPage,
      componentProps: {
        name: 'Table de',
        description: ''
      },
      swipeToClose: true
    });

    modal.onWillDismiss().then((dataReturned) => {
      console.table(dataReturned);
      if (dataReturned.data !== undefined) {
        this.dataReturned = dataReturned.data;
        const navigationExtras: NavigationExtras = {
          state: this.dataReturned
        };
        this.router.navigate(['sessionHome'], navigationExtras);
      }
    });

    return await modal.present();
  }
}
