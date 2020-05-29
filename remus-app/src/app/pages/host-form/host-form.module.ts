import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HostFormPageRoutingModule } from './host-form-routing.module';

import { HostFormPage } from './host-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HostFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HostFormPage]
})
export class HostFormPageModule {}
