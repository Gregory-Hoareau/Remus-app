import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrowdsourcingService {

  readonly base_url = 'http://192.168.1.166:8000/';
  readonly character_sheet_url = this.base_url + 'characterSheet/';

  private all_sheet: CharacterSheet[] = []
  //sheets$: BehaviorSubject<CharacterSheet[]> = new BehaviorSubject(this.all_sheet);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getCharacterSheets() {
    return this.http.get<CharacterSheet[]>(this.character_sheet_url);
  }

  postCharacterSheet(sheet: CharacterSheet) {
    return this.http.post<CharacterSheet>(this.character_sheet_url, sheet);
  }
}
