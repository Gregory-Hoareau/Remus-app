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
import { DiceRoll } from 'src/app/models/dice-roll.model';



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
    this.diceService.resetDices();
  }

  ionViewDidEnter() {
    this.slider.update()
  }


  //Aleart that opens the macro creation form. Asks for the name to save the macro as and creates macro from current dice selection.
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
            this.macroService.createMacro(data.macroName, this.diceService.diceSelected, this.diceService.StringifyDice(), this.diceService.modifier, this.diceService.normalDices);
            this.diceService.resetDices(); //BUG: if dice are not reset, creating new macro overrides previous.
          }
        }
      }]
    });
    await alert.present();
  }

  //Presents the dice result of a DiceRoll. Result displayed in big central, roll detail under.
  //Player can reroll same configuration by pressing again. 
  async presentAlertConfirm(diceRoll: DiceRoll) {

    const alert = await this.alertController.create({
      header: diceRoll.result.toString(),
      message: diceRoll.separatedValue,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'buttons',
          handler: () => {
          }
        }, {
          cssClass: 'buttons',
          text: 'Again',
          handler: () => {
            this.presentAlertConfirm(this.diceService.launchDice(undefined, this.diceService.modifier));
          }
        }
      ]
    });
    await alert.present();
    return alert;
  }


  //Manage slides
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  //Gyroscope launch logic
  gyroscopeSetting() {
    if (this.gyroscope) {
      this.sub.unsubscribe();
      this.gyroscope = false;
    } else if (!this.gyroscope){
      this.sub = this.shakeDetector.startWatch(50).subscribe(() => {
        this.presentAlertConfirm(this.diceService.launchDice(undefined,this.diceService.modifier));
      });
      this.gyroscope = true;
    }
  }

  //Launches dice with the selected macro's configuration
  macroLaunch(macro: Macro){
    this.presentAlertConfirm(this.diceService.launchDice(macro.dices, macro.modifier));
  }

}
