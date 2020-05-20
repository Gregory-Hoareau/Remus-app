import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HostFormPage} from '../host-form/host-form.page';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataReturned: any;

  constructor(private modalCtr: ModalController, private routerOutlet: IonRouterOutlet) {

  }

  async openModal() {
    const modal = await this.modalCtr.create({
      component: HostFormPage,
      componentProps: {
        "id": 123,
        "name": "Table de",
        "description": ""
      },
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
