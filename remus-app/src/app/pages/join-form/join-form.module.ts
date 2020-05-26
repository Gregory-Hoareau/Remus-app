import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinFormPageRoutingModule } from './join-form-routing.module';

import { JoinFormPage } from './join-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [JoinFormPage]
})
export class JoinFormPageModule {}
