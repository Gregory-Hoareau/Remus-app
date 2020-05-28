import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import {DocPopupPage} from './doc-popup.page';
import {DocPopupRoutingModule} from './doc-popup-routing.module';
import {SharePopupModule} from '../share-popup/share-popup.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DocPopupRoutingModule,
    ReactiveFormsModule,
    SharePopupModule,
  ],
  declarations: [DocPopupPage]
})
export class DocPopupModule {}
