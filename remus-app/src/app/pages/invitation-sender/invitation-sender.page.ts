import { Component, OnInit, Input } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-invitation-sender',
  templateUrl: './invitation-sender.page.html',
  styleUrls: ['./invitation-sender.page.scss'],
})
export class InvitationSenderPage implements OnInit {

  @Input()
  roomId: string;

  numbers: any[] = [];

  constructor(private sms: SMS, private contacts: Contacts, 
              private toastCtrl: ToastController,
              private androidPerm: AndroidPermissions,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  addNumber() {
    this.contacts.pickContact().then(contact => {
      const number = contact.phoneNumbers[0].value.split('-').join('');
      console.log(number);
      this.numbers.push({name: contact.displayName, num: number});
    })
  }

  removeNumber(index) {
    this.numbers.splice(index, 1);
  }

  sendSms() {
    this.androidPerm.checkPermission(this.androidPerm.PERMISSION.SEND_SMS).then(result => {
      if(result.hasPermission) {
        this.sendToMultiple();
      } else {
        this.androidPerm.requestPermission(this.androidPerm.PERMISSION.SEND_SMS);
      }
    })
    
  }

  async sendToMultiple() {
    const total = this.numbers.length;
    let count = 0;

    console.log('Start Sending')
    const p: Promise<number> = new Promise((resolve, fail) => {
      this.numbers.map(c => c.num).forEach(async (c, ind) => {
        const res = await this.sms.send(c, 'https://remus.com/join/' + this.roomId)
        console.log(res)
        if (res === 'OK') {
          count += 1;
          this.numbers.splice(ind, 1);
        }
        console.log('Done '+ind)
        if(ind === total-1) {
          resolve(count)
        }
      });
      
    });


    p.then((count) => {
      console.log('End Sending')
      this.toastCtrl.create({
        duration: 1000,
        position: 'bottom',
        message: count + '/' + total + 'Invitation(s) envoyée(s) avecc succès'
      }).then(toast => toast.present());
    })
    
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
