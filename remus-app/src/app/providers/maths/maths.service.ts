import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsService {

  getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max))) + 1;;
  }
  
}
