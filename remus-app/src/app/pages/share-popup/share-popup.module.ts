import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {SharePopupRoutingModule} from './share-popup-routing.module';
import {SharePopupPage} from './share-popup.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharePopupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SharePopupPage]
})
export class SharePopupModule {}
