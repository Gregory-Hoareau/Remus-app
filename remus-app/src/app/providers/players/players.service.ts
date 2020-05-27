import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playersList: any[]

  constructor() {
    this.playersList = []
  }
}
