import { Injectable } from '@angular/core';
import {Macro} from '../../models/macro.model';

@Injectable({
  providedIn: 'root'
})
export class MacroService {

  macros: Macro[];
  constructor() {
    this.macros = [];
  }
}
