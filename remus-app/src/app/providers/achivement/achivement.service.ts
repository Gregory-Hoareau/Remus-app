import { Injectable } from '@angular/core';
import { all_characters } from 'src/mocks/Character'
import {Achivement} from '../../models/achivement.model';

@Injectable({
  providedIn: 'root'
})
export class AchivementService {
  achivements: Achivement[];
  partage:boolean = false;
  avancee:any = 0;

  constructor() {

    this.achivements = [];
    // tslint:disable-next-line:no-unused-expression
    this.setUpAvancee;
  }
  addAchivement(achivement:Achivement){
    this.achivements.push(achivement);
  }
  validAchivement(titre: string) {
    this.achivements.forEach(a => {
      if (a.titre === titre) {
        a.checked = !a.checked;
      }
    });
  }
  remove(achivement: Achivement){
    this.achivements.splice(this.achivements.indexOf(achivement),1);
    this.setUpAvancee();
  }
setUpAvancee(){
  let temp = 0;
  this.achivements.forEach(p => {
  if (p.checked) {
    temp = temp + 1 ;
    }
  });
  if ( this.achivements.length !== 0) {
    this.avancee = ((temp / this.achivements.length));
  } else {
    this.avancee = 0.0;
  }
}

}
