import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { IonRouterOutlet } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {JoinFormPage} from "../join-form/join-form.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataReturned: any;

  constructor(private router: Router, private modalCtr: ModalController, private routerOutlet: IonRouterOutlet) {

  }

  async joinModal() {
    const joiningmodal = await this.modalCtr.create({
      component: JoinFormPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });

    joiningmodal.onWillDismiss().then((dataReturned) => {
      console.table(dataReturned)
      if (dataReturned.data !== undefined) {
        this.dataReturned = dataReturned.data;
        let navigationExtras: NavigationExtras = {
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
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });

    modal.onWillDismiss().then((dataReturned) => {
      console.table(dataReturned)
      if (dataReturned.data !== undefined) {
        this.dataReturned = dataReturned.data;
        let navigationExtras: NavigationExtras = {
          state: this.dataReturned
        };
        this.router.navigate(['home'], navigationExtras);
      }
    });

    return await modal.present();
  }
}
