import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import {SharePopupRoutingModule} from './share-popup-routing.module';
import {SharePopupPage} from './share-popup.page';
import {File} from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharePopupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SharePopupPage],
  providers: [File, FormBuilder, NavParams, Camera]
})
export class SharePopupModule {}
