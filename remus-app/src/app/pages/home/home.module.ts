import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HostFormPageModule } from '../host-form/host-form.module';
import {JoinFormPageModule} from '../join-form/join-form.module';
import { CustomSheetPageModule } from '../custom-sheet/custom-sheet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HostFormPageModule,
    JoinFormPageModule,
    CustomSheetPageModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
