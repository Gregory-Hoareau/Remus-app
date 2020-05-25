import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import {DocPopupPage} from './doc-popup.page';
import {DocPopupRoutingModule} from './doc-popup-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocPopupRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DocPopupPage]
})
export class DocPopupModule {}
