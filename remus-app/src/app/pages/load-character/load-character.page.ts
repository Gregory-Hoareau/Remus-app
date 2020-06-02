import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { File } from '@ionic-native/file/ngx';
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';

@Component({
  selector: 'app-load-character',
  templateUrl: './load-character.page.html',
  styleUrls: ['./load-character.page.scss'],
})
export class LoadCharacterPage implements OnInit {

  characters: CharacterSheet[];

  constructor(private modalCtrl: ModalController, private file: File) { }

  ngOnInit() {
    this.characters = [];
    this.file.listDir(this.file.dataDirectory, 'characterSheet').then((listing) => {
      for (const f of listing) {
        console.log(f);
        const path = this.file.dataDirectory;
        const filename = f.fullPath.substr(1);
        console.log(filename);
        this.file.readAsText(path, filename).then(value => {
          this.characters.push(JSON.parse(value) as CharacterSheet)
        })
      }
    });
  }

  displayCharacter(character: CharacterSheet) {
    this.modalCtrl.create({
      component: CharacterSheetPage,
      componentProps: {
        display: true,
        import: true,
        character: character
      }
    }).then(modal => {
      modal.present();
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }



}
