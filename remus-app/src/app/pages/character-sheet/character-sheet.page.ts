import { Component, OnInit, SecurityContext } from '@angular/core';
import {CharacterSheet} from '../../models/character-sheet.model';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { CharacterService } from 'src/app/providers/character/character.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.page.html',
  styleUrls: ['./character-sheet.page.scss'],
})
export class CharacterSheetPage implements OnInit {

  character: CharacterSheet;

  constructor(private alertCtrl: AlertController, private imgPicker: ImagePicker, private file: File,
    private characterService:CharacterService, private modalCtrl:ModalController,
    private navParams: NavParams) {
      const index = navParams.get('charInd');
      this.character = this.characterService.getCharacter(index);
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
        }}],
    });

    await alert.present();
  }

  async editTraitAlert(title) {
    const alert = await this.alertCtrl.create({
      header: title.charAt(0).toUpperCase() + title.slice(1),
      inputs: [{
        name: title,
        type: 'number',
        placeholder: title,
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data[title] !== '') {
            const allTrait = this.character.traits;
            for (const t of allTrait) {
              if (t.name === title) {
                t.value = data[title];
              }
            }
          }
        },
      }, {
        text: 'Annuler',
        handler: () => {
          console.log('Action cancel');
        }
      }],
    });

    await alert.present();
  }

  deleteSkill(index) {
    this.character.skills.splice(index, 1);

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
            this.character.skills.push(data.skill);
          }
        }
      }]
    });
    await alert.present();
  }

  addPicture() {
    this.imgPicker.hasReadPermission().then((result) => {
      if (!result) {
        this.imgPicker.requestReadPermission()
      } else {
        this.imgPicker.getPictures({maximumImagesCount: 1}).then((results) => {
          console.log('Get the results');
          for(let i = 0; i < results.length; i++) {
            let filename = results[i].substring(results[i].lastIndexOf('/')+1)
            let path = results[i].substring(0, results[i].lastIndexOf('/')+1)
            this.file.readAsDataURL(path, filename).then((url) => {
              this.character.img = url
            })
          }
        })
      }
    })
    /**/
    /*this.fileChooser.open().then(uri => {
        this.filePath.resolveNativePath(uri).then(nativePath => {
          this.character.img = this.sanitizer.sanitize(SecurityContext.URL, nativePath);
          alert(nativePath)
          this.character.img = nativePath
        }).catch(e => alert(e))
      }
    ).catch(
      e => alert(e)
    )*/
  }

}
