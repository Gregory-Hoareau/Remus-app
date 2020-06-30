import { Component } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { IonRouterOutlet } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {JoinFormPage} from '../join-form/join-form.page';
import { PlayersService } from 'src/app/providers/players/players.service';
import { CustomSheetPage } from '../custom-sheet/custom-sheet.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataReturned: any;

  constructor(private router: Router, private modalCtr: ModalController, private playerServ:PlayersService, private menuController: MenuController) {

  }


  ionViewDidEnter() {
    this.menuController.enable(false,'playerList');
    this.menuController.enable(true,'mainMenu');
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

    modal.onWillDismiss().then(async (dataReturned) => {
      console.table(dataReturned);
      console.log("HERE")
      console.log(dataReturned)
      if (dataReturned.data.template === 'Custom') {
        this.dataReturned = dataReturned;
        const customisation = await this.modalCtr.create({
          component: CustomSheetPage,
          componentProps: {
            dataReturned: dataReturned.data,
            sheet: dataReturned.data.sheet
          },
          swipeToClose: true
        });

        await customisation.present();
      }
      else if (dataReturned.data !== undefined) {
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
