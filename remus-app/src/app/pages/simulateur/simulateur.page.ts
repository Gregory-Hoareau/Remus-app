import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { DiceHistoryService } from 'src/app/providers/diceHistory/dice-history.service';
import { Macro } from 'src/app/models/macro.model';
import {MacroService} from '../../providers/macro/macro.service';
import {Dice} from '../../models/dice.model';
import {DiceService} from '../../providers/dice/dice.service';
import {Shake} from "@ionic-native/shake/ngx";
//import {SpecialDice} from "../../models/special-dice.model";
import { MusicService } from 'src/app/providers/music/music.service';
import { SOUNDS } from 'src/mocks/Track';



@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.page.html',
  styleUrls: ['./simulateur.page.scss'],
})
export class SimulateurPage implements OnInit {

  @ViewChild('slides', {
    static: true
  }) slider: IonSlides;


  // View var
  segment = 0;
  gyroscope : boolean;
  sub: any; //subscribe to gyroscope



  constructor(public shakeDetector: Shake, public alertController: AlertController, public diceService: DiceService,
    public diceHistoryService: DiceHistoryService, private alertCtrl: AlertController,
    public macroService: MacroService, private musicService: MusicService)  { }

  ngOnInit() {
    this.resetDices();
  }

  ionViewDidEnter() {
    this.slider.update()
  }

  async specialDicesAlert() {
    const tab = [];
    for (const i of this.diceService.specialGame.keys()) {
      if ( i === 'Normal') {
        tab.push({
          label: i,
          type: 'radio' as const,
          value: i,
          checked: true,
        });
      } else {
        tab.push({
          label: i,
          type: 'radio' as const,
          value: i,
        });
      }
    }
    const alert = await this.alertCtrl.create({
      header: 'Sélectionner le JDR dont vous souhaitez utiliser les dés spéciaux :',
      inputs: tab,
      buttons: [{
        text: 'Valider',
        handler: data => {
          this.resetDices();
          if (this.diceService.specialGame.get(data) === this.diceService.Normal) {
            this.diceService.normalDices = true;
          } else {
            this.diceService.normalDices = false;
            this.diceService.specialDiceSet = data;
          }
        }
      }]
    });
    await alert.present();
  }

  async newMacroAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nouvelle Macro',
      inputs: [{
        name: 'macroName',
        type: 'text',
        placeholder: 'Nom de la macro',
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data.macroName !== '') {
            this.macroService.createMacro(data.macroName, this.diceService.diceSelected, this.diceService.StringifySelectedDice(), this.diceService.modifier, this.diceService.normalDices);
            this.resetDices(); //BUG: if dice are not reset, creating new macro overrides previous.
          }
        }
      }]
    });
    await alert.present();
  }


  async presentAlertConfirm(diceRoll: any[], modifier: number = 0, roll_name: string) {
    var seperatedValues = "";
    var sum:any = 0;
    diceRoll.forEach(val =>{
      sum += val
      seperatedValues += val + " + "
    })
    seperatedValues =  seperatedValues.substring(0, seperatedValues.length-2);
    if(modifier){
      sum += modifier

      var modif:string = modifier > 0 ? `+ ${modifier}` : `${modifier}`
      seperatedValues += modif
      roll_name += modif
    }

    sum = sum.toString()
    
    this.diceHistoryService.addDiceRoll({
      name:roll_name,
      result:sum,
      separatedValue:seperatedValues,
      modificator:modifier
    })

    const alert = await this.alertController.create({
      header: sum,
      message: seperatedValues,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'buttons',
          handler: () => {
            if(this.diceService.typeOfDiceHasBeenChanged) {
              this.diceService.typeOfDiceHasBeenChanged = false;
              this.diceService.normalDices = !this.diceService.normalDices;
              this.resetDices();
            }
          }
        }, {
          cssClass: 'buttons',
          text: 'Again',
          handler: () => {
            this.launchDice();
          }
        }
      ]
    });
    await alert.present();
    return alert;
  }

  async presentAlertConfirmSpecial(data: string[]) {
    let message = '';
    for (const path of data) {
      message = message + '<ion-img class="resultPopupDices" src=' + path + '></ion-img>';
    }
    const finalResult = '<div class="popupSpecialDice">' + message + '</div>';
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: finalResult,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'buttons',
          handler: () => {
            if(this.diceService.typeOfDiceHasBeenChanged) {
              this.diceService.typeOfDiceHasBeenChanged = false;
              this.diceService.normalDices = !this.diceService.normalDices;
              this.resetDices();
            }
          }
        }, {
          cssClass: 'buttons',
          text: 'Again',
          handler: () => {
            this.launchDice();
          }
        }
      ]
    });
    await alert.present();
    return alert;
  }

  async noDiceAlert() {
    const alert = await this.alertController.create({
      header: 'Aucun dé sélectionné',
      message: 'Vous devez choisir au moins un dé pour pouvoir faire une lancé de dé',
      buttons: ['Compris'],
    });
    await alert.present();
  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  gyroscopeSetting() {
    if (this.gyroscope) {
      this.sub.unsubscribe();
      this.gyroscope = false;
    } else if (!this.gyroscope){
      this.sub = this.shakeDetector.startWatch(50).subscribe(() => {
        this.launchDice();
      });
      this.gyroscope = true;
    }
  }

  // Dice thrower functions

  addDiceToSelection(dice:Dice){
    this.diceService.AddSelectedDice(dice);
  }

  //;u;
  resetDices() {
    this.diceService.resetDices();
  }

  launchDice(){
    this.musicService.launchSound(SOUNDS[0]);
    this.presentAlertConfirm(this.diceService.launchDice(), this.diceService.modifier, this.diceService.StringifySelectedDice());
  }

  macroLaunch(macro: Macro){
    this.musicService.launchSound(SOUNDS[0]);
    this.presentAlertConfirm(this.diceService.launchDice(macro.dices), macro.modifier, macro.stringDices);
  }

}
