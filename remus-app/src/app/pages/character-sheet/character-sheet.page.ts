import { Component, OnInit, SecurityContext } from '@angular/core';
import {CharacterSheet} from '../../models/character-sheet.model';
import {AlertController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { CharacterService } from 'src/app/providers/character/character.service';
import { CrowdsourcingService } from 'src/app/providers/crowdsourcing/crowdsourcing.service';
import { LoadCharacterPage } from '../load-character/load-character.page';
import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { ThrowStmt } from '@angular/compiler';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.page.html',
  styleUrls: ['./character-sheet.page.scss'],
})
export class CharacterSheetPage implements OnInit {

  character: CharacterSheet;
  read_only: boolean;
  importing: boolean;
  importIcon = faFileImport;
  exportIcon = faFileExport;

  constructor(private alertCtrl: AlertController, private imgPicker: ImagePicker, private file: File,
    private characterService:CharacterService, private modalCtrl:ModalController,
    private navParams: NavParams, private toastController: ToastController,
    private crowdsourcing: CrowdsourcingService) {
      this.read_only = navParams.get('display');
      this.importing = navParams.get('import')
      if (this.read_only) {
        this.character = navParams.get('character');
      } else {
        const index = navParams.get('charInd');
        this.character = this.characterService.getCharacter(index);
      }
      
    }

  ngOnInit() {
  }

  async editPersonalAlert(title) {
    let field;
    switch (title) {
      case 'background': field = 'textarea'; break;
      case 'age': field = 'number'; break;
      default: field = 'text'; break;
    }
    const alert = await this.alertCtrl.create({
      header: title.charAt(0).toUpperCase() + title.slice(1),
      inputs: [{
        name: title,
        type: field,
        placeholder: title,
        value: this.character[title]
      }],
      buttons: [{
          text: 'Annuler',
          handler: () => {
            console.log('Action cancel');
          }
        },
        {
        text: 'Valider',
        handler: data => {
          if (data[title] !== '') {
            if (field === 'number') {
              data[title] = data[title] as number;
            }
            this.character[title] = data[title];
          }
          this.changeSavedToast();
        }}],
    });

    await alert.present();
  }

  changeTraitValue(index, val) {
    this.character.traits[index].value = val;
  }

  async editTraitAlert(index) {
    console.log(this.character.traits)
    const trait = this.character.traits[index];
    const alert = await this.alertCtrl.create({
      header: trait.name.charAt(0).toUpperCase() + trait.name.slice(1),
      inputs: [{
        name: trait.name,
        type: 'number',
        placeholder: trait.name,
        value: (trait.value>-1? trait.value: '')
      }],
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Action cancel');
          }
        },
        {
        text: 'Valider',
        handler: data => {
          if (data[trait.name] !== '') {
            this.changeTraitValue(index, data[trait.name])
          }
          this.changeSavedToast();
        },
      }],
    });

    await alert.present();
  }

  deleteSkill(index) {
    this.character.skills.splice(index, 1);
    this.changeSavedToast();

  }

  async changeSavedToast() {
    this.toastController.create({
      duration: 1000,
      message: 'Changement sauvegardé',
      position: 'bottom',
    }).then(toast => {toast.present()});
  }

  addSkill(skill: Skill) {
    this.character.skills.push(skill);
  }

  async addNewSkillAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nouvelle Compétence',
      inputs: [{
        name: 'skill',
        type: 'text',
        placeholder: 'Nom Compétence',
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data.skill !== '') {
            this.addSkill(data.skill);
          }
          this.changeSavedToast();
        }
      }]
    });
    await alert.present();
  }

  addPicture() {
    if (this.read_only) {
      return
    }
    this.imgPicker.hasReadPermission().then((result) => {
      if (!result) {
        this.imgPicker.requestReadPermission().then(res=> {
          this.addPicture()
        })
      } else {
        this.imgPicker.getPictures({maximumImagesCount: 1}).then((results) => {
          console.log('Get the results');
          for(let i = 0; i < results.length; i++) {
            let filename = results[i].substring(results[i].lastIndexOf('/')+1)
            let path = results[i].substring(0, results[i].lastIndexOf('/')+1)
            this.file.readAsDataURL(path, filename).then((url) => {
              this.character.img = url
            })
          };
          this.changeSavedToast()
        })
      }
    });
  }

  shareCharacter() {
    this.crowdsourcing.postCharacterSheet(this.character).subscribe(sheet => {
      console.log(sheet);
      console.log('Character sheet upload on the server');
      this.toastController.create({
        duration: 1000,
        message: 'La fichier a été envoyé au serveur',
        position: 'bottom',
      }).then(toast => {toast.present()});
    })
  }

  async downloadCharacter() {
    this.createSheetsStorage();
    const path = this.file.dataDirectory + 'characterSheet/';
    let filename = null;
    while(!filename) {
      filename = await this.chooseNameFileAlert();
      await this.file.checkFile(path, filename+'.json').then(async res => {
          await this.replaceFileAlert().then( res=> {
            if(!res) {
              filename = null;
            }
          });
      }).catch(err => {
        console.log('Filename available');
      })
    }
    console.log('CREATING FILE');
    await this.file.createFile(path, filename+'.json', true);
    console.log('WRITING IN FILE');
    await this.file.writeExistingFile(path, filename+'.json', JSON.stringify(this.character));
    console.log('END WRITING');

    this.toastController.create({
      duration: 1000,
      message: 'La fichier a été téléchargé dans les données de l\'application',
      position: 'bottom',
    }).then(toast => {toast.present()});
  }

  private async replaceFileAlert(): Promise<boolean> {
    let resolveFunction: (res: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    })
    const alert = await this.alertCtrl.create({
      message: 'Il y a déjà un fichier avec le même nom, voulez-vous réecrire le fichier ?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            resolveFunction(true);
          }
        },
        {
          text: 'Non',
          handler: () => {
            resolveFunction(false);
          }
        }
      ]
    });
    await alert.present();

    return promise;
  }

  private async chooseNameFileAlert(): Promise<string> {
    let resolveFunction: (name: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveFunction = resolve;
    });
    const alert = await this.alertCtrl.create({
      header: 'Enregistrer',
      message: 'Sous quel nom voulez-vous enregistrer la fiche de personnage',
      backdropDismiss: false,
      inputs: [
        {
          type: 'text',
          name: 'filename',
          placeholder: this.character.name,
        }
      ],
      buttons: [
        {
          text: 'Confirmer',
          handler: (data) => {
            resolveFunction(data.filename);
          }
        }
      ]
    });
    await alert.present();

    return promise;
  }

  private async createSheetsStorage() { // create the folder to store character sheet if it doesn't exist
    await this.file.checkDir(this.file.dataDirectory, 'characterSheet').then(res => {
      console.log('Storage is ready')
    }).catch(async err => {
      console.log('Storage in creation')
      await this.file.createDir(this.file.dataDirectory, 'characterSheet', false)
      console.log('Storage created')
    });
  }

  importCharacter() {
    this.characterService.import(this.character);
    this.modalCtrl.dismiss(undefined, 'Clear', 'Character')
    this.toastController.create({
      duration: 1000,
      message: 'La feuille de personnage a été importé',
      position: 'bottom',
    }).then(toast=> {
      toast.present();
    })
    this.modalCtrl.dismiss();
  }

  async importCharacterForPlayer() {
    const modal = await this.modalCtrl.create({
      component: LoadCharacterPage
    })
    
    await modal.present()
  }

}
