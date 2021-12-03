import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { DiceHistoryService } from 'src/app/providers/diceHistory/dice-history.service';
import { Macro } from 'src/app/models/macro.model';
import {MacroService} from '../../providers/macro/macro.service';
import {Dice} from '../../models/dice.model';
import {DiceService} from '../../providers/dice/dice.service';
import {Shake} from "@ionic-native/shake/ngx";
import {SpecialDice} from "../../models/special-dice.model";
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

  // Simulateur var
  @Input() isModal: boolean;
  public diceHistory: string[];
  segment = 0;
  diceAlert;

  //to string please
  listOfDiceAsString : string;


  // Historique var
  finalValue: string;

  // View var
  modifier: number;
  gyroscope : boolean;
  result : number;
  launched : boolean;
  finalSeparatedValue : string;
  sub: any; //subscribe to gyroscope


  // Controller var
  // normalDices: boolean;
  // typeOfDiceHasBeenChanged: boolean;
  // diceSum : number;
  // specialDices: SpecialDice[];
  // diceSelected : Map<SpecialDice, number>;
  // specialDiceSet: string;
  // separetedValue : string;
  // specialFaces: string[];
  // modifying : boolean;
  // totalDiceSum : number;
  // dices : number[];
  // modificateur : number;
  // modifResult : string;
  // sub: any;

  //Model var




  constructor(public shakeDetector: Shake, public alertController: AlertController, public diceService: DiceService,
    public diceHistoryService: DiceHistoryService, private alertCtrl: AlertController,
    public macroService: MacroService, private musicService: MusicService)  { }

  ngOnInit() {
    this.resetDices();
    console.log(this.diceService.normalDices);
  }

  ionViewDidEnter() {
    this.slider.update()
    console.table(this.macroService.macros);
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
            this.macroService.createMacro(data.macroName, this.diceService.diceSelected, this.listOfDiceAsString, this.diceService.modificateur, this.diceService.normalDices);
          }
        }
      }]
    });
    await alert.present();
  }


  async presentAlertConfirm(diceRoll: any[]) {
    var seperatedValues = "";
    var sum:any = 0;
    diceRoll.forEach(val =>{
      sum += val
      seperatedValues += val + "; "
    })
    if(this.modifier)
      seperatedValues += this.modifier > 0 ? `+ ${this.modifier}` : `- ${this.modifier}`

    sum = sum.toString()

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


  //Not to sure what Im changing
  modifyResult(){
    //this.modificateur = parseInt((document.getElementById("modif") as HTMLInputElement).value, 10);
  }

  addDiceToSelection(dice:Dice){
    this.diceService.AddSelectedDice(dice);
    this.listOfDiceAsString = this.diceService.StringifySelectedDice();
    console.log(this.listOfDiceAsString);
  }



  //;u;
  resetDices() {
    this.finalSeparatedValue = '';
    this.result  = null;
    this.diceService.resetDices();
    this.listOfDiceAsString = this.diceService.printSumDices(this.diceService.diceSelected);
  }

    //TODO : Move to dice provider
  launchDice(){
    this.musicService.launchSound(SOUNDS[0]);
    this.presentAlertConfirm(this.diceService.launchDice());
  }


}
